export function clampString(string: string, maxLen = 10) {
    if (string.length <= maxLen + 3) {
        return string;
    }

    return `${string.slice(10)}...`;
}
