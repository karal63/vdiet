import { defineStore } from "pinia";
import { ref } from "vue";
import type { Meal } from "../types/global";

export const useFoodStore = defineStore("foodStore", () => {
    const meals = ref<Meal[]>([]);
    const openedMealId = ref<number | null>(null);

    const isControlWindowOpen = ref(false);

    return { meals, openedMealId, isControlWindowOpen };
});
