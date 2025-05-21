<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Meal } from "../../types/global";
import { onMounted, ref } from "vue";
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
                    ? 'h-[50px] '
                    : 'h-0'
            "
        >
            <ul class="grid grid-cols-3 max-w-max">
                <li class="text-secondary">
                    Calories: {{ props.singleMeal.calories }}kcal
                </li>
                <li class="text-secondary">
                    Portion: {{ props.singleMeal.portion }}g
                </li>
                <li class="text-secondary">
                    Protein: {{ props.singleMeal.macronutrients.protein }}g
                </li>
                <li class="text-secondary">
                    Carbohydrates:
                    {{ props.singleMeal.macronutrients.carbohydrates }}g
                </li>
            </ul>
        </div>
    </div>
</template>
