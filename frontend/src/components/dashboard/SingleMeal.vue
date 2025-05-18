<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, watch, watchEffect } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import type { Meal } from "../../types/global";
import { useGlobalStore } from "../../stores/globalStore";
import SingleMealDetails from "./SingleMealDetails.vue";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const props = defineProps<{
    meal: any;
}>();

const showDetails = () => {
    if (foodStore.openedMealId === props.meal.id) {
        return (foodStore.openedMealId = null);
    }
    foodStore.openedMealId = props.meal.id;
};

const filteredMeals = computed(() => {
    return globalStore.currentDay.food.filter(
        (filteredMeal) => filteredMeal.category === props.meal.type
    );
});
</script>

<template>
    <div class="rounded-xl py-2">
        <button
            @click="showDetails"
            class="flex justify-between w-full cursor-pointer px-7"
        >
            <h1 class="text-lg w-[150px] text-left">{{ meal.type }}</h1>

            <div class="flex justify-center items-center">
                <button
                    class="text-3xl cursor-pointer transform transition-transform duration-300"
                    :class="
                        meal.id === foodStore.openedMealId ? 'rotate-180' : ''
                    "
                >
                    <Icon icon="iconamoon:arrow-down-2-thin" />
                </button>
            </div>
        </button>

        <div
            class="transition-all px-7 overflow-hidden h-0"
            :class="meal.id === foodStore.openedMealId ? `mt-5` : ''"
            :style="`height: ${
                meal.id === foodStore.openedMealId
                    ? (filteredMeals?.length || 0) * 50
                    : ''
            }px`"
        >
            <ul class="flex flex-col divide-y divide-mainBorder">
                <li v-for="singleMeal in filteredMeals">
                    <SingleMealDetails :singleMeal="singleMeal" />
                </li>
            </ul>
        </div>

        <div class="flex gap-5 items-center mt-1 px-7">
            <span
                class="px-3 py-1 bg-avocado-300/50 rounded-lg font-semibold text-avocado-900"
                >Total:</span
            >
            <ul class="flex gap-4">
                <li>Protein: 25g</li>
                <li>Carbs: 40g</li>
            </ul>
        </div>
    </div>
</template>
