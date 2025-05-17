<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();

watchEffect(() => {
    if (!store.isAuthenticated) {
        router.push("/login");
    }
});

onMounted(() => {
    store.addDay();
    store.getDay();
});

// watchEffect(() => {
//     console.log("called");
//     store.history = store.addDay();
// });
</script>

<template>
    <div class="protected-layout">
        <Sidebar />
        <main>
            <router-view />
        </main>
    </div>
</template>
