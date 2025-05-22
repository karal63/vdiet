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

const meal = ref<Meal>({
    name: "",
    category: "Uncategorized",
    portion: 0,
    calories: 0,
    macronutrients: {
        protein: 0,
        carbohydrates: 0,
    },
});
const areDetailsOpen = ref(false);
const selectedDetail = ref<string | null>(null); // add type

// const clearMeal = () => {
//     meal.value = {
//         name: "",
//         category: "",
//         portion: 0,
//         calories: 0,
//         macronutrients: {
//             protein: 0,
//             carbohydrates: 0,
//         },
//     };
// };

// const cancelMeal = () => {
//     clearMeal();
//     foodStore.isControlWindowOpen = false;
// };

const saveMeal = () => {
    globalStore.currentDay.food = [
        ...globalStore.currentDay.food,
        {
            ...meal.value,
            id: uuidv4(),
        },
    ];
    foodStore.isControlWindowOpen = false;
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
            <div class="flex justify-between items-center mt-2">
                <button
                    @click.prevent="areDetailsOpen = !areDetailsOpen"
                    class="w-8 h-8 bg-avocado-200/70 rounded-full flex-center cursor-pointer text-secondary hover:bg-avocado-200 transition-all hover:text-black"
                >
                    <Icon
                        icon="material-symbols:add-rounded"
                        class="text-2xl"
                    />
                </button>

                <div v-if="selectedDetail" class="flex items-center gap-2">
                    {{ selectedDetail }}:
                    <input
                        type="number"
                        class="border border-mainBorder px-2 h-[38px] w-[90px] rounded-md outline-avocado-300 text-lg"
                    />
                </div>

                <!-- when you click button, entering value elements appears -->
                <!-- value in the button is synced with number field -->
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

        <!-- <div class="flex flex-col mt-2">
            <label class="mb-1 text-secondary">Portion (g)</label>
            <input
                v-model="meal.portion"
                type="number"
                class="border border-mainBorder px-3 h-[38px] rounded-xl outline-avocado-300 text-lg"
            />
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

        <h2 class="mt-4 text-secondary mb-0 font-semibold">Macronutrients:</h2>

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
        </div> -->

        <button
            class="mt-10 flex-center w-full bg-avocado-500 text-white h-[40px] font-semibold rounded-lg cursor-pointer hover:bg-avocado-600 transition-all"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            Add meal
        </button>

        <!-- <button
            @click.prevent="cancelMeal"
            class="mt-2 flex-center w-full border border-mainBorder h-[40px] font-semibold rounded-lg cursor-pointer hover:bg-avocado-100 transition-all"
        >
            Cancel
        </button> -->
    </form>
</template>
