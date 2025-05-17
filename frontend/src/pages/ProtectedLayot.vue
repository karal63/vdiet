<script setup lang="ts">
import { onMounted, watch, watchEffect } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";
import { useFoodStore } from "../stores/foodStore";

const globalStore = useGlobalStore();
const foodStore = useFoodStore();
const router = useRouter();

watchEffect(() => {
    if (!globalStore.isAuthenticated) {
        router.push("/login");
    }
});

onMounted(() => {
    globalStore.addDay();
    globalStore.getDay();
});

watch(
    () => globalStore.currentDay,
    () => {
        console.log("updating meals in database");
        globalStore.updateDay(globalStore.currentDay);
    },
    { deep: true }
);
</script>

<template>
    <div class="protected-layout">
        <Sidebar />
        <main>
            <router-view />
        </main>
    </div>
</template>
