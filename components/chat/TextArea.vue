<script setup lang="ts">
import { PaperAirplaneIcon, ArrowTurnDownLeftIcon } from "@heroicons/vue/24/solid";
import { useCurrentTime } from "~/utils/hooks/useCurrentTime";
import { useOnTabChange } from "~/utils/hooks/useOnTabChange";

const { hostname, maxHeight = 200 } = defineProps<{ hostname: string, maxHeight?: number }>();

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
</script>

<template>
    <div class="flex flex-row gap-2 p-2">
        <span class="mix-w-fit text-nowrap">
            usr@{{ hostname }} <ClientOnly>{{ formatTime(currentTime) }}</ClientOnly>
            &gt;
        </span>
        <textarea
            ref="textAreaRef"
            class="w-full bg-transparent outline-none resize-none
            text-primary dark:text-primary-foreground min-h-[80px]
            placeholder:text-black/20 dark:placeholder:text-white/20"
            autofocus @input="autoresize"
            placeholder="sudo rm -rf / --no-preserve-root"
        ></textarea>

        <div class="inline-flex flex-col justify-center items-center gap-2">
            <button class="rounded-md dark:bg-primary-foreground/20 bg-black/20">
                <PaperAirplaneIcon class="h-[3em] p-1" />
            </button>
            <small class="text-nowrap">
                Ctrl +
                <ArrowTurnDownLeftIcon class="inline h-[1.6em] rounded-sm bg-black/20 dark:bg-white/20 p-1" />
            </small>
        </div>
    </div>
</template>
