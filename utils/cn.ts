import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...classValues: ClassValue[]): string {
    return twMerge(clsx(...classValues));
}
