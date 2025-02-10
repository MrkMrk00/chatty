<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { clampString } from "~/utils/clampString";
import { useConversationsStore } from "~/utils/stores/conversations";

const { index } = defineProps<{ index: number }>();

const conversationsStore = useConversationsStore();
const { getTabAt: getTab } = storeToRefs(conversationsStore);

const tab = computed(() => getTab.value(index));
const isActive = computed(() => index === conversationsStore.activeTabIndex);

function navigateToThisTab() {
    conversationsStore.goToTab(index);
}

function closeThisTab() {
    conversationsStore.closeTab(index);
}
</script>

<template>
    <Title v-if="isActive">{{ tab?.name }}</Title>
    <li v-if="!!tab" class="inline-flex items-center gap-2 px-2 text-lg border-r border-black dark:border-current">
        <button
            class="text-nowrap"
            @click="navigateToThisTab"
            @click.middle="closeThisTab"
        >
            <span :class="cn('text-xs align-middle pb-1 w-[1em]', { 'text-transparent': !isActive })">
                &#x25CF;
            </span>
            {{ clampString(tab.name) }}
        </button>
        <button @click="closeThisTab">
            <XMarkIcon class="h-[1.25em]" />
        </button>
    </li>
</template>
