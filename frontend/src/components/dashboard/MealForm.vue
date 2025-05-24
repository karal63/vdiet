<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";
import { mealsPlan } from "../../constants/meals";
import { v4 as uuidv4 } from "uuid";
import type { Meal } from "../../types/global";
import { mealDetails } from "../../constants/mealDetails";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const meal = ref<Meal>(
    foodStore.editingMeal || {
        name: "",
        category: "Uncategorized",
        portion: 0,
        calories: 0,
        macronutrients: {
            protein: 0,
            carbohydrates: 0,
        },
    }
);

const areDetailsOpen = ref(false);
const selectedDetail = ref<string | null>(null); // add type
const newValue = ref(0);

// fix ts error
const saveMeal = () => {
    if (!globalStore.currentDay) return;

    if (foodStore.controlWindow.mode === "Create") {
        globalStore.currentDay.food = [
            ...globalStore.currentDay.food,
            {
                ...meal.value,
                id: uuidv4(),
            },
        ];
    } else {
        foodStore.editFood(meal.value);
    }

    foodStore.setControlWindow(false, "");
};

const addDetail = () => {
    if (selectedDetail.value === "Portion") {
        meal.value.portion = newValue.value;
    } else if (selectedDetail.value === "Calories") {
        meal.value.calories = newValue.value;
    } else if (selectedDetail.value === "Protein") {
        meal.value.macronutrients.protein = newValue.value;
    } else if (selectedDetail.value === "Carbs") {
        meal.value.macronutrients.carbohydrates = newValue.value;
    }

    newValue.value = 0;
};

watchEffect(() => {
    if (!areDetailsOpen.value) {
        selectedDetail.value = null;
    }
});
</script>

<template>
    <form @submit.prevent="saveMeal" class="w-[350px] relative">
        <!-- first row | name, portion -->
        <div class="flex flex-col">
            <label class="mb-1 text-secondary">Name</label>
            <input
                v-model="meal.name"
                type="text"
                class="border border-mainBorder px-3 h-[38px] rounded-md outline-avocado-300 text-lg"
            />
        </div>

        <div class="flex flex-col mt-2">
            <label class="mb-1 text-secondary">Category</label>
            <select
                v-model="meal.category"
                class="border border-mainBorder w-full rounded-md h-[38px] px-3 text-lg outline-avocado-300"
            >
                <option
                    v-for="mealTime in mealsPlan"
                    :value="mealTime.type"
                    :key="mealTime.type"
                >
                    {{ mealTime.type }}
                </option>
            </select>
        </div>

        <div class="mt-5">
            <label class="mb-1 text-secondary">Details</label>

            <ul class="mt-2 grid grid-cols-2 gap-1">
                <li class="bg-gray-200 px-3 py-1 rounded-md">
                    Portion: {{ meal.portion }}
                </li>
                <li class="bg-gray-200 px-3 py-1 rounded-md">
                    Calories: {{ meal.calories }}g
                </li>
                <li class="bg-gray-200 px-3 py-1 rounded-md">
                    Protein: {{ meal.macronutrients.protein }}g
                </li>
                <li class="bg-gray-200 px-3 py-1 rounded-md">
                    Carbohydrates: {{ meal.macronutrients.carbohydrates }}g
                </li>
            </ul>

            <div
                class="flex justify-between items-center"
                :class="selectedDetail ? 'mt-5' : 'mt-2'"
            >
                <button
                    @click.prevent="areDetailsOpen = !areDetailsOpen"
                    class="rounded-full flex-center gap-1 cursor-pointer hover:text-avocado-600 transition-all"
                >
                    <Icon icon="material-symbols:edit-outline-rounded" />
                    {{ areDetailsOpen ? "Close" : "Edit" }}
                </button>

                <div v-if="selectedDetail" class="flex items-center gap-2">
                    {{ selectedDetail }}:
                    <div class="flex items-center">
                        <input
                            v-model="newValue"
                            type="number"
                            class="border border-mainBorder px-2 h-[38px] w-[90px] rounded-tl-md rounded-bl-md outline-avocado-300 text-lg"
                        />
                        <button
                            @click.prevent="addDetail"
                            class="bg-avocado-500 text-white px-2 h-[38px] rounded-tr-md rounded-br-md cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div
                class="overflow-hidden transition-all mt-3"
                :class="areDetailsOpen ? 'h-[70px]' : 'h-0'"
            >
                <ul class="grid grid-cols-4 gap-2">
                    <li
                        v-for="mealDetail in mealDetails"
                        :key="mealDetail.id"
                        class="bg-purple-200 rounded-md flex-center"
                    >
                        <button
                            @click.prevent="selectedDetail = mealDetail.name"
                            class="cursor-pointer text-sm py-1 flex items-center gap-1"
                        >
                            <Icon
                                icon="material-symbols:add-rounded"
                                class="text-lg"
                            />
                            {{ mealDetail.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <button
            class="mt-10 flex-center w-full bg-avocado-500 text-white h-[40px] font-semibold rounded-lg cursor-pointer hover:bg-avocado-600 transition-all"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            {{ foodStore.controlWindow.mode }} meal
        </button>
    </form>
</template>
