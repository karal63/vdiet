<script setup lang="ts">
import { computed, watch } from "vue";
// import { summary } from "../../constants/summary";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";
import WaterSummary from "./WaterSummary.vue";
import type { Meal } from "../../types/global";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

// List of nutrient types for iteration
const summary = [
    { name: "Calories" },
    { name: "Protein" },
    { name: "Carbohydrates" },
];

// Reset values on mount
// onMounted(() => {
//     foodStore.calories = 0;
//     foodStore.protein = 0;
//     foodStore.carbohydrates = 0;
// });

// Watch for food changes and recalculate
watch(
    () => globalStore.currentDay?.food,
    (newMeals: Meal[] = []) => {
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

// when updating goals in settings and moving back to dashboard values are not upd,
// or it works, find the solution

// Computed percentages
const percentages = computed(() => {
    const goals = globalStore.currentDay?.goals;

    return {
        Calories: goals?.caloriesGoal
            ? (foodStore.calories * 100) / goals.caloriesGoal
            : "0",
        Protein: goals?.proteinGoal
            ? (foodStore.protein * 100) / goals.proteinGoal
            : "0",
        Carbohydrates: goals?.carbohydratesGoal
            ? (foodStore.carbohydrates * 100) / goals.carbohydratesGoal
            : "0",
    };
});

// Computed values string
const values = computed(() => {
    const goals = globalStore.currentDay?.goals;
    return {
        Calories: `${foodStore.calories.toFixed(2)} / ${
            goals?.caloriesGoal
        }kcal`,
        Protein: `${foodStore.protein.toFixed(2)} / ${goals?.proteinGoal}g`,
        Carbohydrates: `${foodStore.carbohydrates.toFixed(2)} / ${
            goals?.carbohydratesGoal
        }g`,
    };
});
</script>

<template>
    <div class="mt-10">
        <h1 class="text-2xl">Your goals</h1>

        <div class="flex gap-10 h-[170px]">
            <ul class="w-1/2 flex flex-col gap-6 mt-5">
                <li v-for="summaryDetail in summary" :key="summaryDetail.name">
                    <div class="flex justify-between">
                        <p class="text-secondary">{{ summaryDetail.name }}</p>
                        <p class="text-right pt-1 text-sm text-secondary">
                            {{
                                values[
                                    summaryDetail.name as keyof typeof values
                                ]
                            }}
                        </p>
                    </div>
                    <div class="mt-1 relative">
                        <div
                            class="absolute left-0 top-0 bg-gray-200 h-1 w-full"
                        ></div>
                        <div
                            :style="{
                                width: `${percentages[summaryDetail.name as keyof typeof values]}%`,
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
