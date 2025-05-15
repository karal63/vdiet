<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch, watchEffect } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import type { Meal } from "../../types/global";

const store = useFoodStore();

const props = defineProps<{
    meal: any;
}>();

const filteredMeals = ref<Meal[]>(
    store.meals.filter(
        (filteredMeal) => filteredMeal.category === props.meal.type
    )
);

const showDetails = () => {
    if (store.openedMealId === props.meal.id) {
        return (store.openedMealId = null);
    }
    store.openedMealId = props.meal.id;
};
</script>

<template>
    <div class="transition-all py-2 px-3">
        <button
            @click="showDetails"
            class="w-full flex justify-between rounded-xl cursor-pointer"
        >
            <h1 class="text-lg w-[150px] text-left">{{ meal.type }}</h1>

            <div class="flex gap-5 items-center">
                <span class="px-3 py-1 bg-avocado-300/50 rounded-lg"
                    >Total:</span
                >
                <ul class="flex gap-4">
                    <li>Protein: 25g</li>
                    <li>Carbs: 40g</li>
                </ul>
            </div>

            <div class="flex justify-center items-center">
                <button class="text-3xl cursor-pointer">
                    <Icon icon="iconamoon:arrow-up-2-thin" />
                </button>
            </div>
        </button>

        <div
            class="transition-all mt-5"
            :class="meal.id === store.openedMealId ? 'h-[200px]' : 'h-0'"
        >
            <ul
                v-if="meal.id === store.openedMealId"
                class="flex flex-col divide-y divide-mainBorder"
            >
                <li v-for="singleMeal in filteredMeals" class="py-2">
                    {{ singleMeal.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
