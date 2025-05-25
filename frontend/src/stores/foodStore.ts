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

    const controlWindow = ref({
        isOpen: false,
        mode: "create",
    });

    const setControlWindow = (
        isOpen: boolean,
        mode: "Edit" | "Create" | ""
    ) => {
        controlWindow.value = {
            isOpen,
            mode,
        };
    };

    const hideControlWindow = () => {
        controlWindow.value.isOpen = false;
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

    const editingMeal = ref<Meal | null>();

    const editFood = (updatedMeal: Meal) => {
        if (!globalStore.currentDay) return;

        const updatedFood = globalStore.currentDay.food.map((meal) => {
            if (meal.id === editingMeal.value?.id) {
                return {
                    id: meal.id,
                    ...updatedMeal,
                };
            }
            return meal;
        });

        globalStore.currentDay.food = updatedFood;
        editingMeal.value = null;
    };

    const caloriesGoal = ref(3000);
    const proteinGoal = ref(156);
    const carbohydratesGoal = ref(488);

    const calories = ref(0);
    const protein = ref(0);
    const carbohydrates = ref(0);

    return {
        meals,
        openedMealId,
        controlWindow,
        hideControlWindow,
        openedMealDetailsId,
        deleteFood,
        setControlWindow,
        editFood,
        editingMeal,
        calories,
        protein,
        carbohydrates,
        caloriesGoal,
        proteinGoal,
        carbohydratesGoal,
    };
});
