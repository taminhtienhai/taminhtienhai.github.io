import { elasticOut } from 'svelte/easing';

export function typewriter(
    node: HTMLElement,
    { speed = 1, wordDelay = 150 }: { speed?: number; wordDelay?: number }
) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent ?? '';
    const words = text.split(/(\s+)/); // Preserve whitespace

    // Calculate duration: base typing + delays between words
    const charDuration = text.length / (speed * 0.01);
    const wordCount = words.filter(w => w.trim()).length;
    const delayDuration = (wordCount - 1) * wordDelay;
    const totalDuration = charDuration + delayDuration;

    return {
        duration: totalDuration,
        tick: (t: number) => {
            const elapsed = t * totalDuration;
            let charBudget = (elapsed / totalDuration) * text.length;

            let displayText = '';
            let charCount = 0;
            let wordsTyped = 0;

            for (const word of words) {
                const wordLen = word.length;
                const isWhitespace = !word.trim();

                // Apply delay only after non-whitespace words
                if (!isWhitespace && wordsTyped > 0) {
                    charBudget = Math.max(0, ((elapsed - (wordsTyped * wordDelay)) / totalDuration) * text.length);
                }

                if (charCount + wordLen <= charBudget) {
                    displayText += word;
                    charCount += wordLen;
                    if (!isWhitespace) wordsTyped++;
                } else {
                    // Partial word typing
                    const remaining = Math.floor(charBudget - charCount);
                    displayText += word.slice(0, Math.max(0, remaining));
                    break;
                }
            }

            node.textContent = displayText;
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