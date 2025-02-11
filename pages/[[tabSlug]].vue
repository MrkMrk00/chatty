<script setup lang="ts">
import Window from "~/components/window/Window.vue";
definePageMeta({
    middleware: "auth",
});
</script>

<template>
    <main class="flex flex-col sm:py-8 py-4 h-full overflow-hidden">
        <Window />
    </main>
</template>
