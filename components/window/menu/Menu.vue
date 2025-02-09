<script setup lang="ts">
import ActionButton from '~/components/window/ActionButton.vue';
import Tab from '~/components/window/menu/Tab.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useConversationsStore } from '~/utils/stores/conversations';
const conversationsStore = useConversationsStore();

function openNewTab() {
    conversationsStore.openNewTab();
}
</script>

<template>
    <ClientOnly>
        <menu class="inline-flex flex-row">
            <Tab
                v-for="(tab, tabIndex) in conversationsStore.tabs" 
                :index="tabIndex"
                :key="`tab-${tab.name}-${tabIndex}`"
            />
            <li class="inline-flex items-center px-2">
                <ActionButton @click="openNewTab">
                    <PlusIcon class="h-[2em] p-1" />
                </ActionButton>
            </li>
        </menu>
    </ClientOnly>
</template>
