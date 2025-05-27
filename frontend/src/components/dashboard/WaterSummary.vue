<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, watchEffect } from "vue";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useGlobalStore();
const globalStore = useGlobalStore();

const water = ref({
    volumeMl: 280,
});

const totalLiters = computed(() => {
    if (!globalStore.currentDay?.waterIntake) return;

    return (
        globalStore.currentDay?.waterIntake.reduce(
            (sum, entry) => sum + entry.volumeMl,
            0
        ) / 1000
    );
});

const addIntake = () => {
    globalStore.addWaterIntake(water.value);
};

const selectWater = (waterIntake) => {
    console.log(waterIntake);
    // check if exists, then delete
    globalStore.selectedWaterIntakes = [
        ...globalStore.selectedWaterIntakes,
        waterIntake,
    ];
};

const checkIfSelected = (waterIntake) => {
    return globalStore.selectedWaterIntakes.find(
        (el) => el.id === waterIntake.id
    );
};

const deleteWater = () => {
    globalStore.deleteWaterIntakes();
};
</script>

<template>
    <div
        class="h-full w-1/2 border border-mainBorder rounded-xl drop-shadow-xl bg-gray-50 p-4 flex flex-col justify-between"
    >
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-lg">Water intake</h1>
                <p>{{ totalLiters }}l/3l</p>
            </div>

            <div class="mt-2 grid grid-cols-8 place-items-center">
                <button
                    v-for="water in foodStore.currentDay?.waterIntake"
                    @click="() => selectWater(water)"
                    class="text-2xl hover:text-avocado-600 transition-all cursor-pointer p-1 rounded-md active:bg-avocado-200"
                    :class="{ 'bg-avocado-200': checkIfSelected(water) }"
                >
                    <Icon icon="circum:glass" />
                </button>
                <!-- add button -->
                <button
                    v-if="globalStore.isProtecteDate()"
                    @click="addIntake"
                    class="text-3xl relative max-w-max text-secondary cursor-pointer"
                >
                    <Icon icon="material-symbols:add-rounded" />
                </button>
            </div>
        </div>

        <div
            v-if="globalStore.isProtecteDate()"
            class="flex items-center justify-between"
        >
            <div
                v-if="globalStore.isProtecteDate()"
                class="flex items-center gap-2"
            >
                <input
                    v-model="water.volumeMl"
                    type="number"
                    class="border border-mainBorder w-20 py-1 rounded-md px-2 outline-none"
                />
                <span class="text-sm text-secondary">Volume (ml)</span>
            </div>

            <button
                @click="deleteWater"
                v-if="globalStore.selectedWaterIntakes.length > 0"
                class="cursor-pointer"
            >
                Delete
            </button>
        </div>
    </div>
</template>
