import { elasticOut } from 'svelte/easing';

export function typewriter(node: HTMLElement, { speed = 1 }: { speed?: number }) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent ?? '';
    const duration = text.length / (speed * 0.01);

    return {
        duration,
        tick: (t: number) => {
            const i = ~~(text.length * t);
            node.textContent = text.slice(0, i);
        }
    };
}

export function whoosh(node: HTMLElement, params: { delay?: number, duration?: number, easing?: (t: number) => number }) {
    const existingTransform = getComputedStyle(node).transform.replace('none', '');

    return {
        delay: params.delay || 0,
        duration: params.duration || 400,
        easing: params.easing || elasticOut,
        css: (t: any, _: any) => `transform: ${existingTransform} scale(${t})`
    };
}