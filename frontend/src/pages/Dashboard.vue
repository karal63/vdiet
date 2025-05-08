<script setup lang="ts">
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();

console.log(store.isLoading);
</script>

<template>
    <div v-if="store.isLoading">
        <h1 class="text-4xl bg-purple-500">Loading...</h1>
    </div>
    <div v-else>
        <h1>Dashboard</h1>
        <p>Hello, {{ store.loggedUser.data.user.username }}</p>
    </div>
</template>
