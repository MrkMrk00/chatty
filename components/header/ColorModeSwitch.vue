<script setup lang="ts">
import { cn } from "~/utils/cn";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";

const colorMode = useColorMode();
const darkIsChosen = ref(colorMode.value === "dark");

watchEffect(() => {
    switch (darkIsChosen.value) {
        case true:
            colorMode.preference = "dark";
            break;

        case false:
            colorMode.preference = "light";
            break;
    }
});
</script>

<template>
    <div class="flex flex-row items-center">
        <strong>Light</strong>
        <div class="px-2">
            <ClientOnly>
                <Switch v-if="!colorMode.unknown" v-model="darkIsChosen" :class="cn(
                    'bg-white relative inline-flex h-6 min-w-11 items-center rounded-full', {
                    'bg-primary/90': darkIsChosen
                })">
                    <span 
                        :class="cn('translate-x-1 inline-block h-4 w-4 transform rounded-full bg-primary/90 transition', {
                            'translate-x-6 bg-white' : darkIsChosen,
                        })"
                    />
                </Switch>

                <template #fallback>
                    <Switch disabled class="bg-white opacity-90 relative inline-flex h-6 min-w-11 items-center rounded-full">
                        <span class="translate-x-1 inline-block h-4 w-4 rounded-full bg-primary/20"
                        />
                    </Switch>
                </template>
            </ClientOnly>
        </div>
        <strong>Dark</strong>
    </div>
</template>
