<script setup lang="ts">
const attrs = useAttrs();
</script>

<template>
    <input 
        :class="cn(
            `w-full bg-primary/30 outline-none py-2 px-4 text-primary dark:text-primary-foreground placeholder:text-black/20 dark:placeholder:text-white/20`, 
            attrs.className ?? ''
        )"
    >
</template>
