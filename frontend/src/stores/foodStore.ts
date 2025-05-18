import { defineStore } from "pinia";
import { ref } from "vue";
import type { Meal } from "../types/global";

export const useFoodStore = defineStore("foodStore", () => {
    const meals = ref<Meal[]>([]);
    const openedMealId = ref<number | null>(null);

    // change to id | number when you create id for food
    const openedMealDetailsId = ref<string | null>("");

    const isControlWindowOpen = ref(false);

    const showControlWindow = () => {
        isControlWindowOpen.value = true;
        document.body.classList.add("overflow-y-hidden");
    };

    const hideControlWindow = () => {
        isControlWindowOpen.value = false;
        document.body.classList.remove("overflow-y-hidden");
    };

    return {
        meals,
        openedMealId,
        isControlWindowOpen,
        showControlWindow,
        hideControlWindow,
        openedMealDetailsId,
    };
});
