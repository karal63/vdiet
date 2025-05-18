<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Meal } from "../../types/global";
import { ref } from "vue";

const props = defineProps<{
    singleMeal: Meal;
}>();

const areDetailsOpen = ref(false);
</script>

<template>
    <div class="py-2">
        <button
            @click="areDetailsOpen = !areDetailsOpen"
            class="w-full flex justify-between items-center cursor-pointer"
        >
            <h3
                class="transition-all"
                :class="areDetailsOpen ? 'font-semibold' : ''"
            >
                {{ singleMeal.name }}
            </h3>

            <ul class="flex gap-7 items-center">
                <li class="flex-center">
                    <button
                        class="text-xl text-secondary cursor-pointer hover:text-avocado-600 transition-all"
                    >
                        <Icon icon="mingcute:delete-line" />
                    </button>
                </li>
                <li class="flex-center">
                    <button
                        class="text-xl text-secondary cursor-pointer hover:text-avocado-600 transition-all"
                    >
                        <Icon icon="material-symbols:edit-outline-rounded" />
                    </button>
                </li>
                <li class="flex-center">
                    <button
                        class="text-3xl cursor-pointer transform transition-transform duration-300"
                        :class="areDetailsOpen ? 'rotate-180' : ''"
                    >
                        <Icon icon="iconamoon:arrow-down-2-thin" />
                    </button>
                </li>
            </ul>
        </button>

        <div
            class="transition-all rounded-xl overflow-hidden"
            :class="areDetailsOpen ? 'h-[100px] ' : 'h-0'"
        >
            <ul class="grid grid-cols-3">
                <li class="text-secondary">
                    Calories: {{ props.singleMeal.calories }}kcal
                </li>
                <li class="text-secondary">
                    Portion: {{ props.singleMeal.portion }}g
                </li>
                <li class="text-secondary">
                    Protein: {{ props.singleMeal.macronutrients.protein }}g
                </li>
                <li class="text-secondary">
                    Carbohydrates:
                    {{ props.singleMeal.macronutrients.carbohydrates }}g
                </li>
            </ul>
        </div>
    </div>
</template>
