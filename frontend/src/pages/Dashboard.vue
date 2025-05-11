<script setup lang="ts">
import InfoProvidingWindow from "../components/dashboard/InfoProvidingWindow.vue";
import { dishes } from "../constants/dishes";
import { useGlobalStore } from "../stores/globalStore";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();
</script>

<template>
    <!-- <InfoProvidingWindow /> -->
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

        <!-- <div
            class="w-full h-[300px] border border-mainBorder mt-5 rounded-xl"
        ></div> -->

        <!-- day list -->
        <div class="mt-10">
            <h1 class="text-2xl font-semibold">Morning</h1>
            <ul
                class="mt-5 border border-mainBorder divide-y-[1px] divide-mainBorder rounded-md"
            >
                <li v-for="dish in dishes" class="py-2 px-4">
                    {{ dish.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
