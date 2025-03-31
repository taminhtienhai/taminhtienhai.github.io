import { html, type TemplateResult } from "lit-html";
import type { Heading, TOC } from "./types";

export const buildTOC = ({ title, headings }: TOC) => {

};

export class TOCNode<T> {
    value: T;
    children: TOCNode<T>[] = [];

    constructor(value: T) {
        this.value = value;
    }
}

export class TOCTree<T> {
    root: TOCNode<T>;

    constructor(value: T) {
        this.root = new TOCNode(value);
    }

    append(node: TOCNode<T>, level: number) {
        let cursor = this.root;

        if ([0,1].includes(level)) {
            return;
        }

        for (let index = 1; index < level - 1; index++) {
            if (cursor === undefined || cursor.children.length === 0) {
                break;
            }
            cursor = cursor.children[cursor.children.length - 1]; // get last child
        }

        cursor?.children.push(node);
    }

    traverseDF<T>(cb: (node: TOCNode<T>) => void, rootNode: TOCNode<T>) {
        let cursor = rootNode;
        for (const node of cursor?.children ?? []) {
            this.traverseDF(cb, node);
            cb(node);
        }
    }

    // todo: optimize this using Stack datastructure to mitigate stackoverflow issue
    buildToc<Out>(id_gen: (node: TOCNode<Heading>) => Out, rootNode: TOCNode<Heading>): TemplateResult<1>[] {
        let templates = [];
        let cursor = rootNode;
        for (const node of cursor?.children ?? []) {
            const { value: { text } } = node;
            const id = node.value.id || id_gen(node);
            const ref_id = `a_${id}`;
            const template = this.buildToc(id_gen, node);
            if (template.length <= 0) {
                templates.push(html`<li><a id="${ref_id}" href="#${id}">${text}</a></li>`);
            } else {
                templates.push(html`
                    <li>
                        <a id="${ref_id}" href="#${id}">${text}</a>
                        <ul>${template}</ul>
                    </li>
                `)
            }
        }
        return templates;
    }
}