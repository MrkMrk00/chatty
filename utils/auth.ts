import { z } from "zod";

export const AUTH_COOKIE_NAME = "CHATTYSESSID";

export const loginValidator = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .refine((pwd) => /[A-Z]/.test(pwd), { message: "Password must contain at least 1 uppercase letter." })
        .refine((pwd) => /[a-z]/.test(pwd), { message: "Password must contain at least 1 lowercase letter." })
        .refine((pwd) => /[0-9]/.test(pwd), { message: "Password must contain at least 1 digit." }),
});
