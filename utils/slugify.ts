/**
 * @see https://jasonwatmore.com/vanilla-js-slugify-a-string-in-javascript
 */
export function slugify(input: string) {
    if (!input) return "";

    // make lower case and trim
    let slug = input.toLowerCase().trim();

    // remove accents from charaters
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: I copied it and it seems to work
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, "-");

    return slug;
}
