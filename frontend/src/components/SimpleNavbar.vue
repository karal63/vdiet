<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/globalStore";

const store = useGlobalStore();
const router = useRouter();

const logoutFromAcc = () => {
    store.logout();
    router.push("/login");
};
</script>

<template>
    <div class="flex justify-center bg-mainLightBg">
        <div class="w-[1350px] py-3 px-5 flex justify-between">
            <RouterLink to="/" class="font-logo2">
                <span class="text-5xl italic font-semibold text-avocado-600"
                    >V</span
                ><span class="text-3xl">diet</span>
            </RouterLink>

            <button
                v-if="store.isAuthenticated"
                @click="logoutFromAcc"
                class="cursor-pointer"
            >
                Log out
            </button>

            <!-- logged in details -->
        </div>
    </div>
</template>
