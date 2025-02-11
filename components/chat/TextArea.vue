<script setup lang="ts">
import { PaperAirplaneIcon, ArrowTurnDownLeftIcon } from "@heroicons/vue/24/solid";
import { useCurrentTime } from "~/utils/hooks/useCurrentTime";
import { useOnTabChange } from "~/utils/hooks/useOnTabChange";

const {
    hostname,
    disabled = false,
    rows = 6,
} = defineProps<{
    hostname: string;
    disabled?: boolean;
    rows?: number;
}>();

const textAreaRef = ref<HTMLTextAreaElement>();
useOnTabChange(() => {
    textAreaRef.value?.focus();
});

const currentTime = useCurrentTime();
function formatTime(now: Date) {
    return now.toLocaleTimeString();
}

const emit = defineEmits<{
    submitMessage: [string];

    // https://www.freepascal.org/docs-html/rtl/crt/clrscr.html
    // Something from my early programming journey :)
    ClrScr: [];
}>();

function submitMessage() {
    // Make TS happy
    if (!textAreaRef.value) {
        return;
    }

    const message = textAreaRef.value?.value;
    if (!message) {
        return;
    }

    emit("submitMessage", message);
    textAreaRef.value.value = "";
}

function autoresize() {
    if (!textAreaRef.value) {
        return;
    }

    textAreaRef.value.style.height = "auto";
    textAreaRef.value.style.height = `${Math.min(textAreaRef.value.scrollHeight, 200)}px`;
}
</script>

<template>
    <div class="w-full justify-between flex flex-row gap-2 px-2">
        <div class="flex gap-2 flex-col md:flex-row w-full">
            <div class="mix-w-fit text-nowrap h-full">
                usr@{{ hostname }} <ClientOnly>{{ formatTime(currentTime) }}</ClientOnly><br>
                <span class="text-sm">
                    Commands:<br>
                    <hr>
                    <table class="w-full">
                        <tbody>
                            <tr>
                                <td class="text-primary-foreground">/rename {name}&emsp;</td>
                                <td align="right">rename tab</td>
                            </tr>
                            <tr>
                                <td class="text-primary-foreground">/clear&emsp;<br>&emsp;or
                                    <div class="inline dark:text-white text-black">
                                        Ctrl +
                                        <span class="h-[1.6em] rounded-sm bg-black/20 dark:bg-white/20 p-1">l
                                        </span>
                                    </div>
                                </td>
                                <td align="right">clear</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>

            <div class="inline-flex gap-2 w-full">
                <span>&gt;</span>
                <textarea @keydown.ctrl.enter="submitMessage" @keydown.ctrl.l.prevent="$emit('ClrScr')"
                    @input="autoresize" :disabled="disabled" ref="textAreaRef" :rows="rows" class="w-full bg-transparent outline-none resize-none
                    text-primary dark:text-primary-foreground min-h-[80px]
                    placeholder:text-black/20 dark:placeholder:text-white/20" autofocus
                    placeholder="sudo rm -rf / --no-preserve-root"></textarea>
            </div>
        </div>

        <div :class="cn('inline-flex flex-col items-center gap-2', { 'opacity-60 pointer-events-none': disabled })">
            <button :disabled="disabled" @click="submitMessage"
                class="dark:bg-primary-foreground/20 bg-black/20 hover:brightness-90 transition-all">
                <PaperAirplaneIcon class="h-[3em] p-1" />
            </button>
            <small class="text-nowrap hidden sm:block">
                Ctrl +
                <ArrowTurnDownLeftIcon class="inline h-[1.6em] rounded-sm bg-black/20 dark:bg-white/20 p-1" />
            </small>
        </div>
    </div>
</template>
