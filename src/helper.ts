import { type HTMLTemplateResult, html } from "lit-html";
import type { DirectiveResult } from "lit-html/directive.js";
import { repeat } from "lit-html/directives/repeat.js";
import { type UnsafeHTMLDirective, unsafeHTML } from "lit-html/directives/unsafe-html.js";

export function repeat_template<T>(items: Array<T>, template: (input: T) => HTMLTemplateResult): HTMLTemplateResult {
    let id = 0;
    return html`${repeat(items, (it) => (it as any)?.['id'] ?? (id++), (input, _) => template(input))}`;
}

const TEMPLATES: Record<string, DirectiveResult<typeof UnsafeHTMLDirective>> = {};
const JSON_STATIC_FILES: Record<string, string> = {};

const HTML_URL = `${import.meta.env.VITE_BASE_URL}/page`;
const JSON_URL = `${import.meta.env.VITE_BASE_URL}/json`

export async function load_template({input: { name }}: {input: { name: string }}) {
    // look at the cache first
    if (TEMPLATES[name]) { return html`${TEMPLATES[name]}`; }
    const url = `${HTML_URL}/${name}.html`;
    
    return fetch(url)
        .then(res => res.text())
        .then(content => {
            TEMPLATES[name] = unsafeHTML(content);
            return html`${TEMPLATES[name]}`;
        })
        .catch(err => html`An error occur during fetching template: ${err}`);
}

export async function load_json_text({input: { name }}: {input: { name: string }}) {
    // look at the cache first
    if (JSON_STATIC_FILES[name]) { return JSON_STATIC_FILES[name]; }
    const url = `${JSON_URL}/${name}.json`;

    return fetch(url)
        .then(res => res.text())
        .then(content => {
            JSON_STATIC_FILES[name] = content;
            return content;
        })
        .catch(err => `An error occur during fetching static json: ${err}`);
}

export function parse_json_into<T>(raw_text: string): T[] {
    return JSON.parse(raw_text);
}