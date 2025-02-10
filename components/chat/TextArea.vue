<script setup lang="ts">
import { PaperAirplaneIcon, ArrowTurnDownLeftIcon } from "@heroicons/vue/24/solid";
import { useCurrentTime } from "~/utils/hooks/useCurrentTime";
import { useOnTabChange } from "~/utils/hooks/useOnTabChange";

const { hostname, maxHeight = 200 } = defineProps<{ hostname: string; maxHeight?: number }>();

const textAreaRef = ref<HTMLTextAreaElement>();
useOnTabChange(() => {
    textAreaRef.value?.focus();
});

const currentTime = useCurrentTime();
function formatTime(now: Date) {
    return now.toLocaleTimeString();
}

function autoresize(ev: Event) {
    const area = ev.currentTarget as HTMLTextAreaElement;
    area.style.height = "auto";
    area.style.height = `${Math.min(area.scrollHeight, maxHeight)}px`;
}

defineEmits(["submitMessage"]);
</script>

<template>
    <div class="w-full justify-between flex flex-row gap-2 p-2">
        <div class="flex gap-2 flex-col md:flex-row w-full">
            <span class="mix-w-fit text-nowrap">
                usr@{{ hostname }} <ClientOnly>{{ formatTime(currentTime) }}</ClientOnly>
            </span>

            <div class="inline-flex gap-2 w-full">
                <span>&gt;</span>
                <textarea @keydown.ctrl.enter="$emit('submitMessage', textAreaRef?.value)" ref="textAreaRef"
                    class="w-full bg-transparent outline-none resize-none
                    text-primary dark:text-primary-foreground min-h-[80px]
                    placeholder:text-black/20 dark:placeholder:text-white/20" autofocus @input="autoresize"
                    placeholder="sudo rm -rf / --no-preserve-root"></textarea>
            </div>
        </div>

        <div class="inline-flex flex-col items-center gap-2">
            <button @click="$emit('submitMessage', textAreaRef?.value)"
                class="rounded-md dark:bg-primary-foreground/20 bg-black/20">
                <PaperAirplaneIcon class="h-[3em] p-1" />
            </button>
            <small class="text-nowrap hidden sm:block">
                Ctrl +
                <ArrowTurnDownLeftIcon class="inline h-[1.6em] rounded-sm bg-black/20 dark:bg-white/20 p-1" />
            </small>
        </div>
    </div>
</template>
