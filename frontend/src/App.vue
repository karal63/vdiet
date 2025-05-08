<template>
    <SimpleNavbar />
    <router-view />
</template>

<script setup lang="ts">
import SimpleNavbar from "./components/SimpleNavbar.vue";
import { useGlobalStore } from "./stores/globalStore.ts";
import { onMounted, watch } from "vue";

const store = useGlobalStore();

onMounted(async () => {
    await store.getLoggedUser();
});
</script>
