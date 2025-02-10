import { AUTH_COOKIE_NAME } from "~/utils/auth";

export default defineNuxtRouteMiddleware(() => {
    const cookie = useCookie(AUTH_COOKIE_NAME);

    if (!cookie.value) {
        return navigateTo("/login");
    }
});
