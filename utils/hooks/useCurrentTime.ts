import { ref } from 'vue';

export function useCurrentTime() {
    const currentTime = ref<Date>(new Date());
    let intervalHandle: ReturnType<typeof setTimeout> | undefined = undefined;

    onMounted(() => {
        setInterval(() => {
            currentTime.value = new Date();
        }, 1000);
    });

    onUnmounted(() => {
        clearInterval(intervalHandle);
        intervalHandle = undefined;
    });

    return currentTime;
}

