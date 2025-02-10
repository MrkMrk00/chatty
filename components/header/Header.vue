<script setup lang="ts">
import ColorModeSwitch from "~/components/header/ColorModeSwitch.vue";
import { CommandLineIcon } from "@heroicons/vue/24/solid";
</script>

<template>
    <header
        class="bg-gradient-to-r from-primary/40 from-0% to-primary/80 to-95% shadow-md dark:shadow-sm dark:shadow-primary/60">
        <div class="flex flex-row justify-between py-4 px-8 dark:bg-black/40 bg-white/40">
            <NuxtLink to="/" class="inline-flex flex-row items-center group">
                <h1 class="text-xl group-hover:underline">ChaTTY</h1>&nbsp;
                <CommandLineIcon class="h-[2em]" />
            </NuxtLink>
            <ColorModeSwitch />
        </div>
    </header>
</template>
