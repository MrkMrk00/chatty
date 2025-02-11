<script setup lang="ts">
import ColorModeSwitch from "~/components/header/ColorModeSwitch.vue";
import { CommandLineIcon } from "@heroicons/vue/24/solid";
import { AUTH_COOKIE_NAME } from "~/utils/auth";

const loginCookie = useCookie<{ email: string }>(AUTH_COOKIE_NAME);

</script>

<template>
    <header
        class="bg-gradient-to-r from-primary/40 from-0% to-primary/80 to-95% shadow-md dark:shadow-sm dark:shadow-primary/60">
        <div class="flex flex-row justify-between px-8 dark:bg-black/40 bg-white/40">
            <NuxtLink to="/" class="inline-flex flex-row items-center group py-4">
                <h1 class="text-xl group-hover:underline">ChaTTY</h1>&nbsp;
                <CommandLineIcon class="h-[2em]" />
            </NuxtLink>
            <div class="flex flex-row gap-4 items-center">
                <div class="text-sm text-center" v-if="loginCookie.email">
                    {{ loginCookie.email.split('@')[0] }}<br>
                    <button class="bg-red-500 py-1 px-2 hover:brightness-90 transition-all">Log out</button>
                </div>

                <ColorModeSwitch />
            </div>
        </div>
    </header>
</template>
