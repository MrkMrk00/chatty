<script setup lang="ts">
const attrs = useAttrs();
</script>

<template>
    <button v-bind="attrs" class="bg-white/10 rounded-md">
        <slot />
    </button>
</template>
