<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { summary } from "../../constants/summary";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";
import WaterSummary from "./WaterSummary.vue";
import type { Meal } from "../../types/global";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const getPercent = (name: string) => {
    if (name === "Calories") {
        return ((foodStore.calories * 100) / foodStore.caloriesGoal).toFixed(2);
    }
    if (name === "Protein") {
        return ((foodStore.protein * 100) / foodStore.proteinGoal).toFixed(2);
    }
    if (name === "Carbohydrates") {
        return (
            (foodStore.carbohydrates * 100) /
            foodStore.carbohydratesGoal
        ).toFixed(2);
    }
};

const getValue = (name: string) => {
    if (name === "Calories") {
        return `${foodStore.calories} / ${foodStore.caloriesGoal}kcal`;
    }
    if (name === "Protein") {
        return `${foodStore.protein} / ${foodStore.proteinGoal}g`;
    }
    if (name === "Carbohydrates") {
        return `${foodStore.carbohydrates} / ${foodStore.carbohydratesGoal}g`;
    }
};

onMounted(() => {
    foodStore.calories = 0;
    foodStore.protein = 0;
    foodStore.carbohydrates = 0;
});

watch(
    () => globalStore.currentDay?.food,
    (newMeals: Meal[]) => {
        try {
            foodStore.calories = newMeals.reduce(
                (sum, m) => sum + m.calories,
                0
            );
            foodStore.protein = newMeals.reduce(
                (sum, m) => sum + m.macronutrients.protein,
                0
            );
            foodStore.carbohydrates = newMeals.reduce(
                (sum, m) => sum + m.macronutrients.carbohydrates,
                0
            );
        } catch (error) {
            console.log("no day found.");
            foodStore.calories = 0;
            foodStore.protein = 0;
            foodStore.carbohydrates = 0;
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="mt-10">
        <h1 class="text-2xl">Your goals</h1>

        <div class="flex gap-10 h-[170px]">
            <ul class="w-1/2 flex flex-col gap-6 mt-5">
                <li v-for="summaryDetail in summary">
                    <div class="flex justify-between">
                        <p class="text-secondary">{{ summaryDetail.name }}</p>
                        <p class="text-right pt-1 text-sm text-secondary">
                            {{ getValue(summaryDetail.name) }}
                        </p>
                    </div>
                    <div class="mt-1 relative">
                        <div
                            class="absolute left-0 top-0 bg-gray-200 h-1 w-full"
                        ></div>
                        <div
                            :style="{
                                width: `${getPercent(summaryDetail.name)}%`,
                            }"
                            class="absolute left-0 top-0 bg-avocado-500 h-1 max-w-full transition-all duration-300"
                        ></div>
                    </div>
                </li>
            </ul>

            <div class="w-1/2">
                <WaterSummary />
            </div>
        </div>
    </div>
</template>
