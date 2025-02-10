<script setup lang="ts">
import Menu from "~/components/window/menu/Menu.vue";
import TextArea from "~/components/chat/TextArea.vue";
import { storeToRefs } from "pinia";
import { useConversationsStore } from "~/utils/stores/conversations";

const conversationsStore = useConversationsStore();
const { activeTabIndex } = storeToRefs(conversationsStore);

const currentMessage = ref("");

async function doSubmitMessage(message: string) {
    if (!message) {
        return;
    }

    for await (const token of conversationsStore.sendMessage(message)) {
        currentMessage.value += ` ${token}`;
    }

    currentMessage.value = "";
}

</script>

<template>
    <div class="flex flex-col max-w-6xl px-4 w-full h-full mx-auto">
        <div class="flex flex-col w-full h-full border rounded-xl shadow-2xl overflow-hidden overflow-hidden">
            <Menu />
            <div class="bg-primary/40 h-full">
                <div>
                    {{ currentMessage }}
                </div>
                <TextArea 
                    :hostname="`tab-${activeTabIndex}`" 
                    @submit-message="doSubmitMessage"
                />
            </div>
        </div>
    </div>
</template>
