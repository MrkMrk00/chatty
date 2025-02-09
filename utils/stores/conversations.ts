import { defineStore } from "pinia";
import { getCurrentTab } from "~/utils/url";

export type WindowTab = {
    name: string;
};

export const useConversationsStore = defineStore('conversations', {
    state: () => {
        const route = useRoute();

        let activeTab = 0;
        if (typeof route.params.tabSlug === 'string') {
            activeTab = getCurrentTab(route.params.tabSlug) ?? 0;
        }

        return {
            activeTab: activeTab,
            tabs: [] as WindowTab[],
        };
    },
    getters: {
        getTab: (state) => (index: number) => {
            if (index > state.tabs.length - 1) {
                return null;
            }

            return state.tabs[index];
        },
        getActiveTab: (state) => {
            return state.tabs[state.activeTab];
        },
    },
    actions: {
        closeTab(tabIndex: number) {
            let indexToGoTo = tabIndex;
            if (tabIndex === this.activeTab && tabIndex > 0) {
                indexToGoTo = tabIndex - 1;
            }

            this.$patch({
                activeTab: indexToGoTo,
                tabs: this.tabs.toSpliced(tabIndex, 1),
            });

            if (this.tabs.length === 0) {
                this.openNewTab();
            }
        },
        openNewTab(name?: string) {
            const newTabIndex = this.tabs.length;
            const newTab = { name: name ?? `New Tab ${newTabIndex}` };

            this.$patch({
                tabs: [...this.tabs, newTab],
                activeTab: newTabIndex,
            });
        },
        goToTab(tabIndex: number) {
            if (this.tabs.length < tabIndex) {
                return;
            }

            this.activeTab = tabIndex;

            // TODO: history popstate handler
            window.history.pushState({ index: tabIndex }, '', getUrlForTab(tabIndex, this.getActiveTab));
            document.title = this.getActiveTab.name;
        },
    },
    persist: {
        omit: ['activeTab'],
    },
});

