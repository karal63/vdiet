<script setup lang="ts">
import { computed, ref } from "vue";

// types
import type { User, Error } from "../types/global";

const user = ref<User>({
    email: "",
    password: "",
    name: "",
});

const secondPassword = ref("");
const error = ref<Error>({
    show: false,
    text: "",
});

const isValidated = computed(() => {
    return (
        user.value.email &&
        user.value.password &&
        user.value.name &&
        secondPassword.value
    );
});

const createAccount = () => {
    if (secondPassword.value !== user.value.password) {
        error.value = {
            show: true,
            text: "Passwords are not the same",
        };
    } else {
        error.value = {
            show: false,
            text: "",
        };
    }
};
</script>

<template>
    <div
        class="h-[calc(100vh-72px)] bg-mainLightBg flex justify-center items-center"
    >
        <div
            class="border border-gray-200 px-9 py-5 w-[400px] rounded-xl shadow-xl"
        >
            <h1 class="text-3xl font-semibold">Sign in</h1>

            <form class="mt-7" @submit.prevent="createAccount">
                <div class="flex flex-col mb-3">
                    <label class="text-grayDull mb-1">Email</label>
                    <input
                        type="email"
                        v-model="user.email"
                        class="border border-mainBorder px-2 py-2 rounded-md outline-avocado-300"
                    />
                </div>

                <div class="flex flex-col mb-3">
                    <label class="text-grayDull mb-1">Password</label>
                    <input
                        type="password"
                        v-model="user.password"
                        class="border border-mainBorder px-2 py-2 rounded-md outline-avocado-300"
                    />
                </div>

                <div class="flex flex-col mb-3">
                    <label class="text-grayDull mb-1">Password (repeat)</label>
                    <input
                        type="password"
                        v-model="secondPassword"
                        class="border border-mainBorder px-2 py-2 rounded-md outline-avocado-300"
                    />
                </div>

                <div class="flex flex-col mb-3">
                    <label class="text-grayDull mb-1">Name</label>
                    <input
                        type="text"
                        v-model="user.name"
                        class="border border-mainBorder px-2 py-2 rounded-md outline-avocado-300"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-avocado-600 py-2 mt-5 rounded-md text-white disabled:text-mainLightBg disabled:bg-avocado-200 cursor-pointer hover:bg-avocado-500 transition-all"
                    :disabled="!isValidated"
                >
                    Create Account
                </button>
            </form>

            <!-- error -->
            <p v-if="error.show" class="text-red-500">
                {{ error.text }}
            </p>

            <p class="mt-5 text-sm text-grayDull">
                Already have the account?
                <RouterLink to="#" class="text-avocado-600">Log in</RouterLink>
            </p>
        </div>
    </div>
</template>
