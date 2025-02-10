import { useConversationsStore } from '~/utils/stores/conversations';
import { watch } from 'vue';

export function useOnTabChange(callback: VoidFunction) {
    const conversationsStore = useConversationsStore();
    const { activeTabIndex } = storeToRefs(conversationsStore);

    watch(activeTabIndex, callback);
}
