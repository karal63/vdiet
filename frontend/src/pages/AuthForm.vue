<script setup lang="ts">
import { computed, ref } from "vue";

// types
import type { User, Error } from "../types/global";
import { useGlobalStore } from "../stores/globalStore";
import { useRoute, useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();

// props & emits
const props = defineProps<{
    mode: string;
}>();

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

const clearUser = () => {
    user.value = {
        email: "",
        password: "",
        name: "",
    };
    secondPassword.value = "";
};

const setError = (show: boolean, text: string) => {
    error.value = {
        show,
        text,
    };
};

const createAccount = async () => {
    // chech if all inputs are provided
    if (props.mode === "login") {
        if (!user.value.email || !user.value.password) {
            return setError(true, "All fields are required.");
        }
    } else {
        if (
            !user.value.email ||
            !user.value.password ||
            !secondPassword.value ||
            !user.value.name
        ) {
            return setError(true, "All fields are required.");
        }
        // validating passwords
        if (secondPassword.value !== user.value.password) {
            return setError(true, "Passwords are not the same.");
        }
    }
    setError(false, "");

    if (props.mode === "signup") {
        await store.signup(
            user.value.email,
            user.value.password,
            user.value.name
        );
    } else {
        await store.login(user.value.email, user.value.password);
    }

    router.push("/dashboard");
    setError(false, "");
    clearUser();
};
</script>

<template>
    <div
        class="h-[calc(100vh-72px)] bg-mainLightBg flex justify-center items-center"
    >
        <div
            class="border border-gray-200 px-9 py-5 w-[400px] rounded-xl shadow-xl"
        >
            <h1 class="text-3xl font-semibold">
                {{ mode === "signup" ? "Sign up" : "Log in" }}
            </h1>

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

                <div v-if="mode === 'signup'" class="flex flex-col mb-3">
                    <label class="text-grayDull mb-1">Password (repeat)</label>
                    <input
                        type="password"
                        v-model="secondPassword"
                        class="border border-mainBorder px-2 py-2 rounded-md outline-avocado-300"
                    />
                </div>

                <div v-if="mode === 'signup'" class="flex flex-col mb-3">
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
                >
                    {{ mode === "signup" ? "Create account" : "Log in" }}
                </button>
            </form>

            <!-- error -->
            <p v-if="error.show" class="text-red-500">
                {{ error.text }}
            </p>

            <p v-if="mode === 'signup'" class="mt-5 text-sm text-grayDull">
                Already have the account?
                <RouterLink to="/log-in" class="text-avocado-600"
                    >Log in</RouterLink
                >
            </p>

            <p v-if="mode === 'login'" class="mt-5 text-sm text-grayDull">
                Don't have an account?
                <RouterLink to="/sign-up" class="text-avocado-600"
                    >Sign up</RouterLink
                >
            </p>
        </div>
    </div>
</template>
