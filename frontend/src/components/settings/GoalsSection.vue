<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Goal } from "../../types/global";

defineEmits<{
    (
        event: "update:goals",
        payload: {
            caloriesGoal: number;
            proteinGoal: number;
            carbohydratesGoal: number;
        }
    ): void;
}>();
defineProps<{
    goals: Goal;
}>();
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
                            @input="
                                (e) =>
                                    $emit('update:goals', {
                                        ...goals,
                                        caloriesGoal: +(e.target as HTMLInputElement).value,
                                    })
                            "
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
                            @input="
                                (e) =>
                                    $emit('update:goals', {
                                        ...goals,
                                        proteinGoal: +(e.target as HTMLInputElement).value,
                                    })
                            "
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
                            @input="
                                (e) =>
                                    $emit('update:goals', {
                                        ...goals,
                                        carbohydratesGoal: +(e.target as HTMLInputElement).value,
                                    })
                            "
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
