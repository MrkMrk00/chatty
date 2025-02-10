<script setup lang="ts">
import TextArea from "~/components/chat/TextArea.vue";
import { storeToRefs } from "pinia";
import { useConversationsStore } from "~/utils/stores/conversations";

const conversationsStore = useConversationsStore();
const { activeTabIndex } = storeToRefs(conversationsStore);
</script>

<template>
    <div class="bg-primary/40 h-full">
        <TextArea :hostname="`tab-${activeTabIndex}`" />
    </div>
</template>
