import { defineStore } from "pinia";

// TODO: conversation history; localStorage saving / server ?
type WindowTab = {
    name: string;
};

export const useConversationsStore = defineStore('conversations', {
    state: () => ({
        activeTab: 0,
        tabs: [] as WindowTab[],
    }),
    getters: {
        activeTab: (state) => {
            return state.tabs[state.activeTab];
        },
    },
    actions: {
        closeTab(tabIndex: number) {
            this.tabs = this.tabs.slice().filter((_, i) => i !== tabIndex);
        },
        openNewTab(name?: string) {
            const newTabIndex = this.tabs.length;

            this.$patch({
                tabs: [...this.tabs, { name: name ?? `New Tab ${newTabIndex}` }],
                activeTab: newTabIndex,
            });
        },
    },
});

