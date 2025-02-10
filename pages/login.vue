<script setup lang="ts">
import Input from "~/components/Input.vue";
import { loginValidator } from "~/utils/auth";

function getEmptyErrorState() {
    return {
        email: [] as string[],
        password: [] as string[],
    };
}

const errors = ref(getEmptyErrorState());
const formRef = useTemplateRef("formRef");

function validateForm() {
    if (!formRef.value) {
        return null;
    }

    const formData = Object.fromEntries(new FormData(formRef.value));
    const result = loginValidator.safeParse(formData);

    // clear the errors
    errors.value = getEmptyErrorState();

    if (result.success) {
        return result.data;
    }

    for (const err of result.error.errors) {
        for (const key in errors.value) {
            if (!err.path.includes(key)) {
                continue;
            }

            errors.value[key as keyof typeof errors.value]?.push(err.message);
        }
    }

    return null;
}

function handleLogin() {
    const formData = validateForm();

    if (!formData) {
        return;
    }

    const req = new Request("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    fetch(req)
        .then(async (r) => {
            if (!r.ok) {
                throw new Error(await r.json());
            }

            const { $toast } = useNuxtApp();
            $toast("Sucessfuly logged in!");
            navigateTo("/");
        })
        .catch((err) => alert(`Unexpected error ${err}`));
}

function hasErrors() {
    return !errors.value.email.length && !errors.value.password.length;
}
</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto w-full pt-4 gap-4 px-4">
        <div class="flex flex-col gap-2 w-full text-center">
            <h1 class="text-2xl">Welcome to <span class="text-primary dark:text-primary-foreground">ChaTTY</span>!</h1>
            <h2 class="text-lg">A Chat Bot That Looks as Good as Your Terminal.</h2>
        </div>
        <hr class="border-black dark:border-current">
        <form 
            action="/api/login" 
            method="post" 
            class="flex flex-col gap-4" 
            @submit.prevent="handleLogin"
            @change="() => hasErrors() || validateForm()"
            ref="formRef"
            novalidate
        >
            Already have an account?
            <label>
                Email:
                <Input name="email" type="email" placeholder="john.doe@outlook.com" required />
                <span v-for="errorMessage in errors.email" class="text-red-500">
                    {{ errorMessage }}<br>
                </span>
            </label>
            <label>
                Password:
                <Input name="password" type="password" placeholder="strongpassword" required />
                <span v-for="errorMessage in errors.password" class="text-red-500">
                    {{ errorMessage }}<br>
                </span>
            </label>

            <div class="flex justify-end">
                <button type="submit" class="dark:text-primary-foreground bg-primary/30 px-4 py-2">
                    Log-in
                </button>
            </div>
        </form>
    </div>
</template>
