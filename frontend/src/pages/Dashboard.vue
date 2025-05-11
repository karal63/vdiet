<script setup lang="ts">
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();
</script>

<template>
    <div class="pl-[120px] pr-[40px] pt-4 h-[100vh] bg-mainLightBg">
        <div v-if="store.isLoading">
            <h1 class="text-4xl bg-purple-500">Loading...</h1>
        </div>
        <div v-else>
            <p class="text-3xl font-black">
                Hello, {{ store.loggedUser?.username }}!
            </p>
            <div>cards etc...</div>
        </div>

        <div
            class="w-full h-[300px] border border-mainBorder mt-5 rounded-xl"
        ></div>
    </div>
</template>
