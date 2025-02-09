<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import ActionButton from "~/components/window/ActionButton.vue";
import { clampString } from "~/utils/clampString";
import { useConversationsStore } from "~/utils/stores/conversations";

const { index } = defineProps<{ index: number }>();

const conversationsStore = useConversationsStore();
const { getTab } = storeToRefs(conversationsStore);

const tab = getTab.value(index);

function navigateToThisTab() {
    conversationsStore.goToTab(index);
}

function closeThisTab() {
    conversationsStore.closeTab(index);
}
</script>

<template>
    <li class="inline-flex items-center gap-2 px-2 text-lg border-r" v-if="!!tab">
        <a :href="getUrlForTab(index, tab)" @click.prevent="navigateToThisTab">{{ clampString(tab.name) }}</a>
        <ActionButton @click="closeThisTab">
            <XMarkIcon class="h-[2em] w-[2em] p-1" />
        </ActionButton>
    </li>
</template>
