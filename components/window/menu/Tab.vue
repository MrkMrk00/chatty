<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { clampString } from "~/utils/clampString";
import { useConversationsStore } from "~/utils/stores/conversations";

const { index } = defineProps<{ index: number }>();

const conversationsStore = useConversationsStore();
const { getTabAt: getTab } = storeToRefs(conversationsStore);

const tab = getTab.value(index);
const isActive = computed(() => index === conversationsStore.activeTabIndex);

function navigateToThisTab() {
    conversationsStore.goToTab(index);
}

function closeThisTab() {
    conversationsStore.closeTab(index);
}
</script>

<template>
    <li class="inline-flex items-center gap-2 px-2 text-lg border-r" v-if="!!tab">
        <a
            class="text-nowrap"
            :href="getUrlForTab(index, tab)" 
            @click.prevent="navigateToThisTab"
        >
            <span :class="cn('text-xs align-middle pb-1 w-[1em]', { 'text-transparent': !isActive })">
                &#x25CF;
            </span>
            {{ clampString(tab.name) }}
        </a>
        <button @click="closeThisTab">
            <XMarkIcon class="h-[1.25em]" />
        </button>
    </li>
</template>
