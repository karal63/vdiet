<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { FetchedUser } from "../types/global";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();
</script>

<template>
    <div v-if="store.isLoading">
        <h1 class="text-4xl">Loading...</h1>
    </div>
    <div v-else>
        <h1>Dashboard</h1>
        <p>Hello, {{ store.isAuthenticated }}</p>
    </div>
</template>
