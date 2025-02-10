<script setup lang="ts">
useHead({
    titleTemplate: (chunk) => `ChaTTY${chunk ? ` - ${chunk}` : ""}`,
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="postcss">
#__nuxt {
    height: 100%;
}

html, body {
    width: 100%;
    height: 100%;
}

body {
    font-family: IBM Plex Mono, sans-serif;
    font-weight: 600;
}

.dark-mode body, input, textarea {
    color: white;
    background-color: #121212;
}

.light-mode body, body, input, textarea {
    @apply bg-primary/10;
    color: black;
}
</style>
