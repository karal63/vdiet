<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const meal = ref({
    name: "",
    portion: 0,
    calories: 0,
    macronutrients: {
        protein: 0,
        carbohydrates: 0,
    },
});

const clearMeal = () => {
    meal.value = {
        name: "",
        portion: 0,
        calories: 0,
        macronutrients: {
            protein: 0,
            carbohydrates: 0,
        },
    };
};

const cancelMeal = () => {
    clearMeal();
    foodStore.isControlWindowOpen = false;
};

const saveMeal = () => {
    globalStore.currentDay.food = [...globalStore.currentDay.food, meal.value];
};
</script>

<template>
    <form @submit.prevent="saveMeal" class="mt-10 max-w-[350px]">
        <!-- first row | name, portion -->
        <div class="flex gap-3">
            <div class="flex flex-col w-[75%]">
                <label class="mb-1 text-secondary">Name</label>
                <input
                    v-model="meal.name"
                    type="text"
                    class="border border-mainBorder px-3 py-1 rounded-xl outline-avocado-300 text-lg"
                />
            </div>
            <div class="flex flex-col w-[25%]">
                <label class="mb-1 text-secondary">Portion (g)</label>
                <input
                    v-model="meal.portion"
                    type="number"
                    class="border border-mainBorder px-3 py-1 rounded-xl outline-avocado-300 text-lg"
                />
            </div>
        </div>

        <div class="mt-5 flex items-center gap-3">
            <label class="text-secondary">Calories (kcal) / 100g: </label>
            <input
                v-model="meal.calories"
                type="number"
                class="border w-20 border-mainBorder px-3 py-1 rounded-xl outline-avocado-300 text-lg"
                placeholder="12g"
            />
        </div>

        <h2 class="mt-8 text-secondary mb-2">Macronutrients:</h2>

        <div class="flex-col gap-2">
            <div class="flex items-center gap-3">
                <label class="text-secondary">Protein (g) / 100g: </label>
                <input
                    v-model="meal.macronutrients.protein"
                    type="number"
                    class="border w-20 border-mainBorder px-3 py-1 rounded-xl outline-avocado-300 text-lg"
                    placeholder="12g"
                />
            </div>

            <div class="flex items-center gap-3">
                <label class="text-secondary">Carbohydrates (g) / 100g: </label>
                <input
                    v-model="meal.macronutrients.carbohydrates"
                    type="number"
                    class="border w-20 border-mainBorder px-3 py-1 rounded-xl outline-avocado-300 text-lg"
                    placeholder="12g"
                />
            </div>
        </div>

        <button
            class="mt-10 flex-center w-full bg-avocado-500 text-white h-[40px] font-semibold rounded-lg cursor-pointer hover:bg-avocado-600 transition-all"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            Add meal
        </button>

        <button
            @click="cancelMeal"
            class="mt-2 flex-center w-full border border-mainBorder h-[40px] font-semibold rounded-lg cursor-pointer hover:bg-avocado-100 transition-all"
        >
            Cancel
        </button>
    </form>
</template>
