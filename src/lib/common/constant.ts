import type { DColor } from "./types";

export const COLORS: DColor[] = ['base', 'neutral', 'primary', 'error', 'info', 'success', 'warning'];

export const randomColor = () => {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(COLORS.length);
    const randIdx = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    return COLORS[randIdx];
};


export const BADGES = new Map<string, DColor>([
    ['rust', 'base'],
    ['js', 'neutral'],
    ['typescript', 'primary'],
    ['web', 'error'],
    ['2025', 'info'],
]);

export const getBadgeColor = (badge_id: string, default_color: DColor = 'base'): DColor => BADGES.get(badge_id) ?? default_color;

export const CATEGORIES = new Map<string, DColor>([
    ['programming', 'base'],
    ['worklife', 'neutral'],
]);