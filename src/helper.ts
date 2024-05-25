import { HTMLTemplateResult, html } from "lit-html";
import { repeat } from "lit-html/directives/repeat.js";

export function repeat_template<T>(items: Array<T>, template: (input: T) => HTMLTemplateResult): HTMLTemplateResult {
    let id = 0;
    return html`
        ${repeat(items, (it) => (it as any)?.['id'] ?? (id++), (input, _) => template(input))}
    `;
}

const TEMPLATES: Record<string, string> = {};

export async function load_template_async({input: { name }}: {input: { name: string }}) {
    if (TEMPLATES[name]) { return html`${TEMPLATES[name]}`; }
    return html`<h1>Dynamic content from ${name}</h1>`;
}