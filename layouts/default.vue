<script setup lang="ts">
import Header from "~/components/header/Header.vue";
</script>

<template>
    <div class="flex flex-col h-full w-full overflow-hidden">
        <Header />
        <slot />
    </div>
</template>
