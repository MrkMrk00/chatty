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
            activeTabIndex: activeTab,
            tabs: [] as WindowTab[],
        };
    },
    getters: {
        getTabAt: (state) => (index: number) => {
            if (index > state.tabs.length - 1) {
                return null;
            }

            return state.tabs[index];
        },
        getActiveTab: (state) => {
            return state.tabs[state.activeTabIndex];
        },
    },
    actions: {
        closeTab(tabIndex: number) {
            type PatchObject = Partial<Parameters<Parameters<typeof this.$patch>[0]>[0]>;
            const patchObject: PatchObject = {
                tabs: this.tabs.toSpliced(tabIndex, 1)
            };

            if (tabIndex <= this.activeTabIndex) {
                let indexToGoTo = tabIndex;
                while (indexToGoTo >= patchObject.tabs!.length && indexToGoTo >= 0) {
                    indexToGoTo--;
                }

                patchObject.activeTabIndex = Math.max(0, indexToGoTo);
            }

            this.$patch(patchObject);

            if (this.tabs.length === 0) {
                this.openNewTab();
            }
        },
        openNewTab(name?: string) {
            const newTabIndex = this.tabs.length;
            const newTab = { name: name ?? `New Tab ${newTabIndex}` };

            this.$patch({
                tabs: [...this.tabs, newTab],
                activeTabIndex: newTabIndex,
            });
        },
        goToTab(tabIndex: number) {
            if (this.tabs.length < tabIndex) {
                return;
            }

            this.activeTabIndex = tabIndex;
        },
    },
    persist: {
        omit: ['activeTabIndex'],
    },
});

