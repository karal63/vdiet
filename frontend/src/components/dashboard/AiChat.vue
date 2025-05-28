<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useGlobalStore } from "../../stores/globalStore";
import { ref } from "vue";

const globalStore = useGlobalStore();

const userQuestion = ref("");

const handleSubmit = () => {
    globalStore.sendMessage(userQuestion.value);
};
</script>

<template>
    <div
        v-if="globalStore.isAiChatOpen"
        class="fixed right-4 bottom-4 pb-6 border border-mainBorder bg-white w-[375px] h-[625px] shadow-mainShadow rounded-xl flex flex-col justify-between"
    >
        <div class="">
            <div
                class="border-b border-b-mainBorder h-[54.8px] px-5 flex justify-between items-center"
            >
                <span class="text-lg">Feel free to ask</span>
                <button
                    @click="globalStore.isAiChatOpen = false"
                    class="cursor-pointer text-3xl"
                >
                    <Icon icon="material-symbols:close-rounded" />
                </button>
            </div>

            <!-- main section -->
            <div class="px-6 h-[410px]">
                <!-- default screen -->
                <div
                    v-if="globalStore.aiChatHistory.length === 0"
                    class="pt-20"
                >
                    <h1 class="text-center">
                        <span
                            class="text-5xl italic font-semibold text-avocado-600"
                            >V</span
                        ><span class="text-3xl">diet</span>
                    </h1>
                    <p class="text-center text-sm mt-4 text-gray-400">
                        Hey! I can help you with any questions regarding your
                        Healthy Lifestyle and Fitness
                    </p>
                </div>

                <!-- message -->
                <div
                    v-if="globalStore.aiChatHistory.length > 0"
                    class="flex flex-col h-full justify-end gap-5"
                >
                    <div class="flex justify-end">
                        <div>
                            <p
                                class="text-right pr-2 text-gray-400 font-light text-sm mb-1"
                            >
                                You
                            </p>
                            <div
                                class="w-[250px] rounded-lg bg-avocado-300 py-1 px-3"
                            >
                                Hello
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start">
                        <div>
                            <p
                                class="text-left pl-2 text-gray-400 font-light text-sm mb-1"
                            >
                                Vdiet assistant
                            </p>
                            <div
                                class="w-[250px] rounded-lg bg-gray-100 border-mainBorder py-1 px-3"
                            >
                                Hello
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mx-6 relative">
            <textarea
                v-model="userQuestion"
                type="text"
                placeholder="How can I help?"
                style="resize: none"
                class="border border-mainBorder rounded-lg w-full h-[110px] px-2 outline-none flex items-start py-2"
            />

            <!-- control elements -->
            <div class="absolute bottom-2 right-2 flex gap-3 items-center">
                <button
                    @click="handleSubmit"
                    class="w-10 h-10 rounded-full text-2xl flex-center cursor-pointer transition-all"
                    :class="
                        userQuestion
                            ? 'text-white bg-avocado-600 hover:bg-avocado-700'
                            : 'text-gray-500 bg-avocado-200 '
                    "
                >
                    ➢
                </button>
            </div>
        </div>
    </div>
</template>
