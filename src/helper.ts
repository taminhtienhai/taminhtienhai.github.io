import { HTMLTemplateResult, html } from "lit-html";
import { DirectiveResult } from "lit-html/directive.js";
import { repeat } from "lit-html/directives/repeat.js";
import { UnsafeHTMLDirective, unsafeHTML } from "lit-html/directives/unsafe-html.js";

export function repeat_template<T>(items: Array<T>, template: (input: T) => HTMLTemplateResult): HTMLTemplateResult {
    let id = 0;
    return html`${repeat(items, (it) => (it as any)?.['id'] ?? (id++), (input, _) => template(input))}`;
}

const TEMPLATES: Record<string, DirectiveResult<typeof UnsafeHTMLDirective>> = {};

export async function load_template_async({input: { name }}: {input: { name: string }}) {
    if (TEMPLATES[name]) { return html`${TEMPLATES[name]}`; }
    let url = `${import.meta.env.VITE_BASE_URL}/${name}.html`;
    
    return fetch(url)
        .then(res => res.text())
        .then(content => {
            TEMPLATES[name] = unsafeHTML(content);
            return html`${TEMPLATES[name]}`;
        })
        .catch(err => html`An error occur during fetching template: ${err}`);
}