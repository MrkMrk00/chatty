<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
</script>

<template>
    <Header />
    <slot />
</template>

<style lang="postcss">
body {
    font-family: IBM Plex Mono, sans-serif;
    font-weight: 600;
}

.dark-mode body {
    color: white;
    background-color: #121212;
}

.light-mode body {
    @apply bg-primary/10;
    color: black;
}
</style>
