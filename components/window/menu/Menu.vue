<script setup lang="ts">
import Tab from "~/components/window/menu/Tab.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useConversationsStore } from "~/utils/stores/conversations";
const conversationsStore = useConversationsStore();

function openNewTab() {
    conversationsStore.openNewTab();
}
</script>

<template>
    <menu class="inline-flex flex-row border-b w-full overflow-x-scroll scroll-gradient py-2 shadow">
        <ClientOnly>
            <Tab v-for="(tab, tabIndex) in conversationsStore.tabs" :index="tabIndex"
                :key="`tab-${tab.name}-${tabIndex}`" />
            <li class="inline-flex items-center px-2">
                <button @click="openNewTab">
                    <PlusIcon class="h-[2em] p-1" />
                </button>
            </li>

            <template #fallback>
                <li class="h-[2em] p-1" />
            </template>
        </ClientOnly>
    </menu>
</template>
