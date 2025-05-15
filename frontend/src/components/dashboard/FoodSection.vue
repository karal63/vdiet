<script setup lang="ts">
import SingleMeal from "./SingleMeal.vue";
import { mealsPlan } from "../../constants/meals";
</script>

<template>
    <div class="mt-10">
        <ul class="flex flex-col gap-5">
            <li
                v-for="meal in mealsPlan"
                class="border border-mainBorder rounded-xl"
            >
                <SingleMeal :meal="meal" />
            </li>
        </ul>
    </div>
</template>
