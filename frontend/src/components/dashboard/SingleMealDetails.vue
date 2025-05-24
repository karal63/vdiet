<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Meal } from "../../types/global";
import { nextTick, onMounted, ref } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const props = defineProps<{
    singleMeal: Meal;
}>();

const emit = defineEmits<{
    (event: "updateCalories", calories: number): void;
    (event: "updateCarbohydrates", carbohydrates: number): void;
    (event: "updateProtein", protein: number): void;
}>();

// when the date is today, it doesnt mount and update values in total
// the problem is that single meal generates multiple food, when page is loaded everything is visible as expected
// but when i navigate back i already can see that for some food function or rerender didnt even work,
// because of this emits are not being called and global total is not being updated
// you need to do something that will rerender all of food when currentDay changes
// it may help with missed rerendering
onMounted(() => {
    emit("updateCalories", props.singleMeal.calories);
    emit("updateCarbohydrates", props.singleMeal.macronutrients.carbohydrates);
    emit("updateProtein", props.singleMeal.macronutrients.protein);
});

const areDetailsOpen = ref(false);

const showDetails = () => {
    if (foodStore.openedMealDetailsId === props.singleMeal.id) {
        return (foodStore.openedMealDetailsId = "");
    }
    foodStore.openedMealDetailsId = props.singleMeal.id ?? null;
};

const currentDate = new Date().toISOString().split("T")[0];
const isCreatingAllowed = () => {
    if (currentDate !== globalStore.currentDay?.date) {
        return false;
    }
    return true;
};
</script>

<template>
    <div class="py-1">
        <div class="w-full flex items-center cursor-pointer">
            <button
                @click="showDetails"
                class="transition-all w-full text-left cursor-pointer"
                :class="areDetailsOpen ? 'font-semibold' : ''"
            >
                {{ singleMeal.name }}
            </button>

            <ul class="flex gap-7 items-center">
                <li v-if="isCreatingAllowed()" class="flex-center">
                    <button
                        @click="
                            singleMeal.id && foodStore.deleteFood(singleMeal.id)
                        "
                        class="text-xl text-secondary cursor-pointer hover:text-avocado-600 transition-all"
                    >
                        <Icon icon="mingcute:delete-line" />
                    </button>
                </li>
                <li v-if="isCreatingAllowed()" class="flex-center">
                    <button
                        class="text-xl text-secondary cursor-pointer hover:text-avocado-600 transition-all"
                    >
                        <Icon icon="material-symbols:edit-outline-rounded" />
                    </button>
                </li>
                <li class="flex-center">
                    <button
                        @click="showDetails"
                        class="text-3xl cursor-pointer transform transition-transform duration-300"
                        :class="
                            foodStore.openedMealDetailsId ===
                            props.singleMeal.id
                                ? 'rotate-180'
                                : ''
                        "
                    >
                        <Icon icon="iconamoon:arrow-down-2-thin" />
                    </button>
                </li>
            </ul>
        </div>

        <div
            class="transition-all rounded-xl overflow-hidden"
            :class="
                foodStore.openedMealDetailsId === props.singleMeal.id
                    ? 'h-[30px]'
                    : 'h-0'
            "
        >
            <ul class="flex items-center gap-3 h-full">
                <li class="text-secondary">
                    Calories: {{ props.singleMeal.calories }}kcal
                </li>

                <div class="w-[1px] h-full bg-mainBorder"></div>

                <li class="text-secondary">
                    Portion: {{ props.singleMeal.portion }}g
                </li>

                <div class="w-[1px] h-full bg-mainBorder"></div>

                <li class="text-secondary">
                    Protein: {{ props.singleMeal.macronutrients.protein }}g
                </li>

                <div class="w-[1px] h-full bg-mainBorder"></div>

                <li class="text-secondary">
                    Carbohydrates:
                    {{ props.singleMeal.macronutrients.carbohydrates }}g
                </li>
            </ul>
        </div>
    </div>
</template>
