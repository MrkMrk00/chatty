import { defineStore } from "pinia";
import { getCurrentTab } from "~/utils/url";

export type Message = {
    content: string;
    author: "user" | "bot";
    timestamp: number;
};

export type WindowTab = {
    name: string;
    chatHistory: Message[];
};

function createNewTab(tabIndex: number, tab?: Partial<WindowTab>): WindowTab {
    return {
        name: `New Tab ${tabIndex}`,
        chatHistory: [],
        ...Object.fromEntries(Object.entries(tab ?? {}).filter(([, v]) => !!v)),
    };
}

export const useConversationsStore = defineStore("conversations", {
    state: () => {
        const route = useRoute();

        let activeTab = 0;
        if (typeof route.params.tabSlug === "string") {
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
                tabs: this.tabs.toSpliced(tabIndex, 1),
            };

            if (tabIndex <= this.activeTabIndex) {
                let indexToGoTo = tabIndex;
                while (indexToGoTo >= (patchObject.tabs?.length ?? Number.POSITIVE_INFINITY) && indexToGoTo >= 0) {
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
            const newTab = createNewTab(newTabIndex, { name });

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
        async *sendMessage(message: string) {
            this.getActiveTab.chatHistory.push({
                content: message,
                timestamp: Date.now() * 1000,
                author: "user",
            });

            let completeMessage = "";
            for await (const token of generateMockResponse()) {
                completeMessage += token;

                yield token;
            }

            this.getActiveTab.chatHistory.push({
                content: completeMessage,
                timestamp: Date.now() * 1000,
                author: "bot",
            });
        },
    },
    persist: {
        omit: ["activeTabIndex"],
    },
});
