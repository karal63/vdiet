import { defineStore } from "pinia";
import { ref } from "vue";
import type { Meal } from "../types/global";

export const useFoodStore = defineStore("foodStore", () => {
    const meals = ref<Meal[]>([]);
    const openedMealId = ref<number | null>(null);

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
    };
});
