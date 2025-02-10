import { loginValidator, AUTH_COOKIE_NAME } from '~/utils/auth';

const TWO_DAYS = 2*24*60*60;

export default defineEventHandler(async (event) => {
    // This should be used for registration rather than login...
    const result = await readValidatedBody(event, body => loginValidator.parse(body));

    // signed JWT in production :)
    setCookie(
        event,
        AUTH_COOKIE_NAME,
        JSON.stringify({ email: result.email }),
        { maxAge: TWO_DAYS, httpOnly: false, sameSite: 'lax', secure: false },
    );
});
