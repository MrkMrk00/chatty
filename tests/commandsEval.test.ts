import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useConversationsStore } from "../utils/stores/conversations";

describe("Command evalutaion", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("clears the conversation", async () => {
        const store = useConversationsStore();
        store.openNewTab();
        store.getActiveTab.chatHistory.push({ author: "user", content: "hello", timestamp: Date.now() / 1000 });
        expect(store.getActiveTab.chatHistory.length).toBe(1);

        await store.sendMessage("/clear").next();

        expect(store.getActiveTab.chatHistory.length).toBe(0);
    });

    it("sends a message", async () => {
        const store = useConversationsStore();
        store.openNewTab();

        const message = "/rename asd";

        const generator = store.sendMessage(message);
        await generator.next();

        expect(store.getActiveTab.chatHistory.length).toBe(1);
        expect(store.getActiveTab.chatHistory[0].content).toBe(message);
    });
});
