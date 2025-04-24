import { Marked, type HooksObject, type MarkedOptions, type RendererObject, type Token } from "marked"
import { kebabCase } from "change-case";

export type ToC = Array<{
    id: string,
    level: number,
    text: number,
}>;

export type Attr = Array<Record<string, string>>;
export type IdGen = Record<string, number>;

export type MarkedState = {
    filename: string,
    toc: ToC,
    meta: Record<string, string>,
    id_gen: IdGen,
};

export default function MdParser($state: MarkedState = {
    filename: '',
    toc: [],
    meta: [],
    id_gen: {},
}) {
    const marked = new Marked();
    marked.use({
        hooks: custom_hooks($state),
        walkTokens: custom_walkTokens($state),
        renderer: custom_render($state),
    });
    marked.use(markedShikiExt());
    return {
        parse(content: string, options: MarkedOptions & {
            async: true;
        }) {
            return marked.parse(content, options);
        },
        parseInline(content: string, options: MarkedOptions & {
            async: true;
        }) {
            return marked.parseInline(content, options);
        }
    }
};

import markedShiki from 'marked-shiki'
import { createHighlighter } from 'shiki'
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
    transformerMetaHighlight,
    transformerMetaWordHighlight,
} from '@shikijs/transformers'

const markedShikiExt = () => {
    const highlighter = createHighlighter({
        langs: ['md', 'js', 'rust', 'java'],
        themes: ['github-dark-dimmed']
    });
    return markedShiki({
        async highlight(code, lang, props) {
            const h = await highlighter;
            return h.codeToHtml(code, {
                lang,
                theme: 'github-dark-dimmed',
                meta: { __raw: props.join(' ') }, // required by `transformerMeta*`
                transformers: [
                    transformerNotationDiff({
                        matchAlgorithm: 'v3'
                    }),
                    transformerNotationHighlight({
                        matchAlgorithm: 'v3'
                    }),
                    transformerNotationWordHighlight({
                        matchAlgorithm: 'v3'
                    }),
                    transformerNotationFocus({
                        matchAlgorithm: 'v3'
                    }),
                    transformerNotationErrorLevel({
                        matchAlgorithm: 'v3'
                    }),
                    transformerMetaHighlight(),
                    transformerMetaWordHighlight()
                ],
            });
        }
    });
}

function custom_render($state: MarkedState): RendererObject {
    $state.id_gen['toc'] ??= 0;
    return {
        heading({ depth, text }) {
            const id_ref = `${kebabCase(text)}`;
            return `
            <h${depth} id="${id_ref}" class="scroll-mt-20">
            ${text}
            </h${depth}>`
        }
    }
}

function custom_walkTokens($state: MarkedState): ((token: Token) => void | Promise<void>) | null | undefined {
    return (token) => {
        if (token.type === 'heading') {
            if (token.depth <= 1) {
                return;
            }
            $state.toc.push({
                id: `${kebabCase(token.text)}`,
                level: token.depth,
                text: token.text,
            });
        }

    }
}

import fm from 'front-matter';

function custom_hooks($state: MarkedState): HooksObject {
    return {
        preprocess(markdown) {
            let { attributes, body } = fm(markdown);

            let attr = { ...attributes as any, link: $state.filename };
            $state.meta = attr;

            for (const prop in attributes as any) {
                if (prop in this.options) {
                    this.options[prop] = attributes[prop];
                }
                /// interpolate yaml's variables
                const regex = new RegExp(`\\{${prop}\\}`, 'g');
                body = body.replaceAll(regex, attributes[prop]);
            }
            return body;
        },
    }
}