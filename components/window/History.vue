<script setup lang="ts">
import { useConversationsStore } from '~/utils/stores/conversations';
import { storeToRefs } from 'pinia';
import { cn } from '~/utils/cn';

const conversationsStore = useConversationsStore();
const { getActiveTab } = storeToRefs(conversationsStore);

</script>

<template>
    <span v-if="getActiveTab && getActiveTab.chatHistory.length === 0" class="w-full text-center font-lg">
        You can ask me anything, I won't tell on you! ;)
    </span>

    <div v-if="getActiveTab" v-for="message in getActiveTab.chatHistory">
        <span>{{ new Date(message.timestamp / 1000).toLocaleTimeString() }} :: </span>

        <span v-if="message.author === 'bot'">ChaTTY answered with: <br></span>
        <span v-else-if="message.author === 'user'">usr &gt;&nbsp;</span>

        <span :class="cn({ 'text-primary-foreground': message.author === 'user' })">
            {{ message.content }}
        </span>
    </div>

    <slot />
</template>
