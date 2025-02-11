<script setup lang="ts">
import Menu from "~/components/window/menu/Menu.vue";
import TextArea from "~/components/chat/TextArea.vue";
import History from "~/components/window/History.vue";
import { storeToRefs } from "pinia";
import { useConversationsStore } from "~/utils/stores/conversations";

const conversationsStore = useConversationsStore();
const { activeTabIndex } = storeToRefs(conversationsStore);

const answersRef = useTemplateRef("answersRef");
const currentMessage = ref("");

async function doSubmitMessage(message: string) {
    if (!message) {
        return;
    }

    try {
        for await (const token of conversationsStore.sendMessage(message)) {
            currentMessage.value += token;

            // scroll to the bottom of the answers container
            if (answersRef.value) {
                answersRef.value.scrollTop = answersRef.value.scrollHeight;
            }
        }
    } finally {
        currentMessage.value = "";
    }
}

function clearScreen() {
    conversationsStore.clearChatHistory();
}
</script>

<template>
    <div class="flex flex-col max-w-6xl px-4 w-full mx-auto h-full overflow-hidden">
        <div class="flex flex-col w-full h-full border rounded-xl dark:shadow-none shadow-lg overflow-hidden">
            <Menu />

            <div class="flex flex-col justify-between bg-primary/40 h-full overflow-hidden gap-4">
                <div class="flex flex-col overflow-y-scroll h-full p-2 gap-4" ref="answersRef">
                    <ClientOnly>
                        <History>
                            <span v-if="currentMessage">ChaTTY is thinking:</span>
                            {{ currentMessage }}
                        </History>
                    </ClientOnly>
                </div>

                <hr>
                <div class="h-full max-h-[50%]">
                    <TextArea :disabled="currentMessage !== ''" :hostname="`tab-${activeTabIndex}`"
                        @submit-message="doSubmitMessage" @clr-scr="clearScreen" />
                </div>
            </div>
        </div>
    </div>
</template>
