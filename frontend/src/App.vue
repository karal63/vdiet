<template>
    <SimpleNavbar />
    <router-view />
</template>

<script setup lang="ts">
import SimpleNavbar from "./components/SimpleNavbar.vue";
import { useGlobalStore } from "./stores/globalStore.ts";
import { onMounted } from "vue";

const store = useGlobalStore();

onMounted(() => {
    fetch("http://localhost:5000/auth/status", {
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status && data.user) {
                store.user = data.user;
                console.log("User set in store:", store.user);
            } else {
                console.log("Not authenticated:", data);
            }
        })
        .catch((err) => {
            console.error("Auth check failed:", err);
        });
});
</script>
