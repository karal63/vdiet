<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { FetchedUser } from "../types/global";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();

onMounted(() => {
    const verifyUser = async () => {
        try {
            const req = await fetch(
                "http://localhost:5000/protected/dashboard",
                {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const res = await req.json();

            if (!res.status) {
                router.push("/log-in");
            }

            store.user = res.user;
        } catch (error) {
            console.log(error);
        }
    };

    verifyUser();
});
</script>

<template>
    <h1>Dashboard</h1>
    <p>Hello, {{ store.user.username }}</p>
</template>
