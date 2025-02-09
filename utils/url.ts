import type { WindowTab } from "~/utils/stores/conversations";

/**
 * Parse the index of the open tab from URL
 */
export function getCurrentTab(pathname: string = window.location.pathname): number | null {
    const splitPath = pathname.split("-");

    if (splitPath.length <= 1) {
        return null;
    }

    const maybeIndex = splitPath[splitPath.length - 1].trim();

    if (maybeIndex !== "" && !Number.isNaN(+maybeIndex)) {
        return +maybeIndex;
    }

    return null;
}

export function getUrlForTab(tabIndex: number, tab: Readonly<WindowTab>): string {
    if (getCurrentTab() === tabIndex) {
        return window.location.pathname;
    }

    return `/${slugify(tab.name)}-${tabIndex}`;
}
