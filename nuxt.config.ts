import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/color-mode",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt",
    ],
    colorMode: {
        storage: "cookie",
    },
    googleFonts: {
        families: {
            "IBM Plex Mono": true,
            useStylesheet: true,
        },
    },
    tailwindcss: {
        config: {
            theme: {
                extend: {
                    colors: {
                        primary: "#2E6914",
                    },
                },
            },
        },
    },
    piniaPluginPersistedstate: {
        storage: "localStorage",
    },
});
