<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch, watchEffect } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import type { Meal } from "../../types/global";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const props = defineProps<{
    meal: any;
}>();

const filteredMeals = ref<Meal[]>();

const showDetails = () => {
    if (foodStore.openedMealId === props.meal.id) {
        return (foodStore.openedMealId = null);
    }
    foodStore.openedMealId = props.meal.id;
};

watch(
    () => globalStore.currentDay.food,
    () => {
        filteredMeals.value = globalStore.currentDay.food.filter(
            (filteredMeal) => filteredMeal.category === props.meal.type
        );
    }
);
</script>

<template>
    <div class="transition-all">
        <button
            @click="showDetails"
            class="w-full rounded-xl cursor-pointer py-2 px-3"
        >
            <div class="flex justify-between">
                <h1 class="text-lg w-[150px] text-left">{{ meal.type }}</h1>

                <div class="flex justify-center items-center">
                    <button class="text-3xl cursor-pointer">
                        <Icon icon="iconamoon:arrow-up-2-thin" />
                    </button>
                </div>
            </div>

            <div
                class="transition-all"
                :class="
                    meal.id === foodStore.openedMealId
                        ? 'h-[200px] mt-5'
                        : 'h-0'
                "
            >
                <ul
                    v-if="meal.id === foodStore.openedMealId"
                    class="flex flex-col divide-y divide-mainBorder"
                >
                    <li v-for="singleMeal in filteredMeals" class="py-2 flex">
                        {{ singleMeal.name }}
                    </li>
                </ul>
            </div>

            <div class="flex gap-5 items-center mt-1">
                <span
                    class="px-3 py-1 bg-avocado-300/50 rounded-lg font-semibold text-avocado-900"
                    >Total:</span
                >
                <ul class="flex gap-4">
                    <li>Protein: 25g</li>
                    <li>Carbs: 40g</li>
                </ul>
            </div>
        </button>
    </div>
</template>
