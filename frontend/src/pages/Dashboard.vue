<script setup lang="ts">
import ControlPanel from "../components/dashboard/ControlPanel.vue";
import FoodControlWindow from "../components/dashboard/FoodControlWindow.vue";
import FoodSection from "../components/dashboard/FoodSection.vue";
import { useFoodStore } from "../stores/foodStore";
import { useGlobalStore } from "../stores/globalStore";

const globalStore = useGlobalStore();
const foodStore = useFoodStore();
</script>

<template>
    <div
        class="pl-[120px] pr-[40px] pt-4 h-[1000px] bg-mainLightBg !overflow-hidden"
    >
        <div v-if="globalStore.isLoading">
            <h1 class="text-4xl bg-purple-500">Loading...</h1>
        </div>
        <div v-else>
            <p class="text-3xl font-black">
                Hello, {{ globalStore.loggedUser?.username }}!
            </p>
            <div>cards etc...</div>
        </div>

        <FoodSection />
        <ControlPanel />
        <FoodControlWindow v-if="foodStore.isControlWindowOpen" />
    </div>
</template>
