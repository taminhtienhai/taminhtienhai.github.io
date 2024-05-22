import { HTMLTemplateResult, html } from "lit-html";
import { repeat } from "lit-html/directives/repeat.js";

export function repeat_template<T>(items: Array<T>, template: (input: T) => HTMLTemplateResult): HTMLTemplateResult {
    let id = 0;
    return html`
        ${repeat(items, (it) => (it as any)?.['id'] ?? (id++), (input, _) => template(input))}
    `;
}