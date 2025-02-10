<script setup lang="ts">
import Menu from "~/components/window/menu/Menu.vue";
import TextArea from "~/components/chat/TextArea.vue";
import { storeToRefs } from "pinia";
import { useConversationsStore } from "~/utils/stores/conversations";

const conversationsStore = useConversationsStore();
const { activeTabIndex } = storeToRefs(conversationsStore);
</script>

<template>
    <div class="flex flex-col max-w-6xl px-4 w-full h-full mx-auto">
        <div class="flex flex-col w-full h-full border rounded-xl shadow-2xl overflow-hidden overflow-hidden">
            <Menu />
            <div class="bg-primary/40 h-full">
                <TextArea :hostname="`tab-${activeTabIndex}`" />
            </div>
        </div>
    </div>
</template>
