<script setup lang="ts">
import Input from "~/components/Input.vue";
</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto w-full pt-4 gap-4 px-4">
        <div class="flex flex-col gap-2 w-full text-center">
            <h1 class="text-2xl">Welcome to <span class="text-primary dark:text-primary-foreground">ChaTTY</span>!</h1>
            <h2 class="text-lg">A Chat Bot That Looks as Good as Your Terminal.</h2>
        </div>
        <hr class="border-black dark:border-current">
        <form action="/api/login" method="post" class="flex flex-col gap-4">
            Already have an account?
            <label>
                Email:
                <Input name="email" type="email" placeholder="john.doe@outlook.com" required />
            </label>
            <label>
                Password:
                <Input name="password" type="password" placeholder="strongpassword" required />
            </label>

            <div class="flex justify-end">
                <button type="submit" class="text-primary-foreground bg-primary/30 px-4 py-2">
                    Log-in
                </button>
            </div>
        </form>
    </div>
</template>
