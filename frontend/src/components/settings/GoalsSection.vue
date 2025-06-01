<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useGlobalStore } from "../../stores/globalStore";
import { ref, watch, watchEffect } from "vue";
import type { Goal } from "../../types/global";

const globalStore = useGlobalStore();

const goals = ref<Goal>({
    caloriesGoal: 0,
    proteinGoal: 0,
    carbohydratesGoal: 0,
});

// Watch for currentDay to become available and update goals
watch(
    () => globalStore.currentDay,
    (newDay) => {
        if (newDay?.goals) {
            goals.value = {
                caloriesGoal: newDay.goals.caloriesGoal,
                proteinGoal: newDay.goals.proteinGoal,
                carbohydratesGoal: newDay.goals.carbohydratesGoal,
            };
        }
    },
    { immediate: true } // Run immediately in case it's already loaded
);

watch(
    () => goals.value,
    () => {
        if (globalStore.currentDay?.goals) {
            globalStore.currentDay.goals.caloriesGoal =
                goals.value.caloriesGoal;
            globalStore.currentDay.goals.proteinGoal = goals.value.proteinGoal;
            globalStore.currentDay.goals.carbohydratesGoal =
                goals.value.carbohydratesGoal;
        }
    },
    { deep: true }
);
</script>

<template>
    <div>
        <h1 class="font-semibold text-xl mb-2">Your goals:</h1>
        <div class="border border-mainBorder rounded-md p-4">
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-5">
                    <label class="text-lg">Calories:</label>
                    <div class="flex gap-2 items-center">
                        <input
                            v-model="goals.caloriesGoal"
                            type="number"
                            class="border rounded-md outline-none border-mainBorder px-3 py-1"
                        />
                        <button
                            @click.prevent
                            class="text-lg text-secondary cursor-pointer"
                        >
                            <Icon
                                icon="material-symbols:edit-outline-rounded"
                            />
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-5">
                    <label class="text-lg">Protein:</label>
                    <div class="flex gap-2 items-center">
                        <input
                            v-model="goals.proteinGoal"
                            type="number"
                            class="border rounded-md outline-none border-mainBorder px-3 py-1"
                        />
                        <button
                            @click.prevent
                            class="text-lg text-secondary cursor-pointer"
                        >
                            <Icon
                                icon="material-symbols:edit-outline-rounded"
                            />
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-5">
                    <label class="text-lg">Carbohydrates:</label>
                    <div class="flex gap-2 items-center">
                        <input
                            v-model="goals.carbohydratesGoal"
                            type="number"
                            class="border rounded-md outline-none border-mainBorder px-3 py-1"
                        />
                        <button
                            @click.prevent
                            class="text-lg text-secondary cursor-pointer"
                        >
                            <Icon
                                icon="material-symbols:edit-outline-rounded"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
