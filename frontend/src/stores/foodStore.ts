import { defineStore } from "pinia";
import { ref } from "vue";
import type { Day, Meal } from "../types/global";
import axios from "axios";
import { useGlobalStore } from "./globalStore";

axios.defaults.withCredentials = true;

export const useFoodStore = defineStore("foodStore", () => {
    const globalStore = useGlobalStore();

    const meals = ref<Meal[]>([]);
    const openedMealId = ref<number | null>(null);

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

    const deleteFood = async (id: string) => {
        const today = new Date().toISOString().split("T")[0];
        const res = await axios.delete("http://localhost:5000/users/history", {
            headers: { "Content-Type": "application/json" },
            data: { today, id },
        });

        globalStore.currentDay = res.data.history.find(
            (day: Day) => day.date === today
        );
    };

    return {
        meals,
        openedMealId,
        isControlWindowOpen,
        showControlWindow,
        hideControlWindow,
        openedMealDetailsId,
        deleteFood,
    };
});
