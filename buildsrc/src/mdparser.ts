import { Marked, type HooksObject, type MarkedOptions, type RendererObject, type Token, type TokenizerAndRendererExtension } from "marked"
import { kebabCase, capitalCase } from "change-case";

export type ToC = Array<{
    id: string,
    level: number,
    text: number,
}>;

export type RTE = {
    minutes: number,
    words: number,
    text: string,
};

export type Attr = Array<Record<string, string>>;
export type IdGen = Record<string, number>;

export type MarkedState = {
    filename: string,
    toc: ToC,
    meta: Partial<PostAttr>,
    id_gen: IdGen,
};

export default function MdParser($state: MarkedState = {
    filename: '',
    toc: [],
    meta: {},
    id_gen: {},
}) {
    const marked = new Marked();
    marked.use({ extensions: [underlineExt] });
    marked.use({
        hooks: custom_hooks($state),
        walkTokens: custom_walkTokens($state),
        renderer: custom_render($state),
    });
    marked.use(markedShikiExt());
    return {
        $state,
        parse(content: string, options: MarkedOptions & {
            async: true;
        }) {
            return marked.parse(content, options);
        },
        parseInline(content: string, options: MarkedOptions & {
            async: true;
        }) {
            return marked.parseInline(content, options);
        },
    }
};

import markedShiki from 'marked-shiki'
import { createHighlighter, type ShikiTransformer } from 'shiki'
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
    transformerMetaHighlight,
    transformerMetaWordHighlight,
} from '@shikijs/transformers'

const highlighter = await createHighlighter({
    langs: ['md', 'js', 'rust', 'java'],
    themes: ['github-dark-dimmed']
});

const markedShikiExt = () => {
    return markedShiki({
        highlight(code, lang, props) {
            const h = highlighter;
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
                    transformerMetaWordHighlight(),
                    compilerErrorBlock(),
                ],
            });
        },
        container: `
<figure class="highlighted-code relative">
<label class="swap absolute top-2 right-2" data-code="%t" data-lang="%l">
    <input type="checkbox" {@attach copyToClipboard} />
    <Icon class="swap-on inline-block" icon="openmoji:check-mark" width="24" height="24" />
    <Icon class="swap-off inline-block" icon="solar:copy-broken" width="24" height="24" />
</label>
%s
</figure>`
    });
};

export function compilerErrorBlock(options = {}): ShikiTransformer {
  return {
    name: 'shiki-transformer-copy-button',
    pre(node) {
        // @ts-ignore
        // node.properties['data-code'] = this.source;
        // node.properties['data-debounce'] = toggleMs;
        node.properties['class'] += ' line-clamp-20 overflow-auto';

        const lang = node.properties['data-lang'];
        if (lang === '') {
            node.properties['class'] += ' compiler-error';
        }
    },
  }
}

const CALLOUT_STYLES = {
    info: { icon: 'solar:pen-line-duotone', bg: 'bg-info/15', text: 'text-info' },
    warn: { icon: 'cuida:warning-outline', bg: 'bg-warning/15', text: 'text-warning' },
    error: { icon: 'mdi:cross-circle-outline', bg: 'bg-error/15', text: 'text-error' },
    success: { icon: 'mdi:success', bg: 'bg-success/15', text: 'text-success' },
};
const CALLOUTS = Object.keys(CALLOUT_STYLES);
type Callout = keyof typeof CALLOUT_STYLES;

function callout(text: string, type: keyof typeof CALLOUT_STYLES) {
    const { icon, bg, text: textColor } = CALLOUT_STYLES[type];
    const lines = text.split('\n').map(txt => `<p class="text-base-content/70">${txt}</p>`);
    return `
    <section class="not-prose card card-xs sm:card-sm md:card-sm lg:card-md xl:card-md 2xl:card-lg bg-base-100 shadow-sm mb-4">
    <div class="card-body py-2 sm:py-4 ${bg} *:leading-tight">
        <h2 class="card-title ${textColor}"><Icon class="inline" icon="${icon}"/>${capitalCase(type)}</h2>
        ${lines.slice(1).join('')}
    </div>
    </section>
    `;
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
        },
        blockquote({ text }) {
            const calloutsRegex = /^\[!([a-zA-Z]+)\]/;
            const matches = calloutsRegex.exec(text);
            const calloutTxt = matches?.[1] as Callout;
            if (matches && calloutTxt && CALLOUTS.includes(calloutTxt)) {
                return callout(text, calloutTxt);
            }

            return `<blockquote>${text}</blockquote>`
        },
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

export type PostAttr = {
    title: string,
    subtitle: string,
    description: string,
    created_date: string,
    tags: string[],
    estimate?: string,
}

import {readingTime} from "reading-time-estimator";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
function custom_hooks($state: MarkedState): HooksObject {
    return {
        preprocess(markdown) {
            let { attributes, body }: { attributes: PostAttr, body: string } = fm(markdown);

            let rt = readingTime(markdown, 80);
            TimeAgo.addDefaultLocale(en);
            const timeAgo = new TimeAgo('en-US');

            let attr = {
                ...attributes,
                // extra attrs
                link: $state.filename,
                estimate: `<em>${rt.words} words</em><span class="status mx-1"></span><em>${rt.text}</em>`,
                time_ago: timeAgo.format(new Date(attributes['created_date'])),
            };
            $state.meta = attr;

            for (const prop in attr) {
                if (prop in this.options) {
                    // @ts-ignore
                    this.options[prop] = attr[prop];
                }
                /// interpolate yaml's variables
                const regex = new RegExp(`\\{${prop}\\}`, 'g');
                // @ts-ignore
                body = body.replaceAll(regex, attr[prop]);
            }

            return body;
        },
    }
}

// turn __{text}__ into <u>{text}</u>
const underlineExt: TokenizerAndRendererExtension = {
    name: 'underline',
    level: 'inline',
    tokenizer(src) {
        const rule = /^__([^_\n]+?)__/;
        const match = rule.exec(src);
        if (match) {
            return {
                type: 'underline',
                raw: match[0],
                text: match[1],
            };
        }
    },
    renderer(token) {
        return `<u>${token.text}</u>`;
    },
};