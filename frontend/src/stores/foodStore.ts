import { defineStore } from "pinia";
import { ref } from "vue";
import type { Meal } from "../types/global";

export const useFoodStore = defineStore("foodStore", () => {
    const meals = ref<Meal[]>([
        {
            id: 1,
            category: "Breakfast",
            name: "scrabled eggs",
        },
        {
            id: 2,
            category: "Lunch",
            name: "Meat with rice",
        },
        {
            id: 3,
            category: "Breakfast",
            name: "scrabled eggs",
        },
    ]);
    const openedMealId = ref<number | null>(null);

    return { meals, openedMealId };
});
