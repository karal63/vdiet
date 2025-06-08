<script setup lang="ts">
import { onMounted, watch, watchEffect } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const globalStore = useGlobalStore();
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
        if (
            new Date().toISOString().split("T")[0] ===
            globalStore.currentDay?.date
        ) {
            console.log("updating meals in database");
            if (globalStore.currentDay.goals) {
                globalStore.updateDay(globalStore.currentDay);
            } else {
                console.log("goals dont exist", globalStore.currentDay.goals);
                globalStore.updateDay({
                    ...globalStore.currentDay,
                    goals: {
                        caloriesGoal: 0,
                        proteinGoal: 0,
                        carbohydratesGoal: 0,
                    },
                });
            }
        }
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
