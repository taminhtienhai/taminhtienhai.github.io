import { type Actor, assertEvent, assign, createActor, fromPromise, sendTo, setup } from "xstate";
import { type BlogPost, HomePageTemplate } from "./component";
import { type HTMLTemplateResult, render } from "lit-html";
import { parse_json_into, load_json_text, load_template } from "./helper";

export type AppEvents =
| { type: 'render'; template: string }
| { type: 'home_page' }
| { type: 'detail_page' };

const HomeMachine = setup({
    types: {
        context: {} as {
            ui: {
                root: HTMLElement,
                items: HTMLElement[],
            },
            posts: BlogPost[],
        },
        events: {} as AppEvents,
    },
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.root);
        },
    },
    actors: {
        loadListBlogs: fromPromise(load_json_text),
    }
}).createMachine({
    initial: 'setup',
    context: {
        ui: {
            root: document.getElementById('route')!,
            items: [],
        },
        posts: [],
    },
    states: {
        setup: {
            invoke: {
                src: 'loadListBlogs',
                input: { name: 'blogs' },
                onDone: {
                    actions: assign(({ event }) => ({ posts: parse_json_into<BlogPost>(event.output) })),
                    target: 'render'
                },
            },
        },
        idle: {
            on: {
                render: {
                    target: 'render',
                },
                setup: {

                    target: 'setup',
                }
            },
        },
        render: {
            entry: [
                // ({ context }) => render(HomePageTemplate(context.posts), context.ui.root),
                { type: 'loadUI', params: ({ context }) => ({ template: HomePageTemplate(context.posts) }) },
                ({context, system}) => {
                    // setup action to each blog post
                    context.ui.root.querySelectorAll('section').forEach((item, index) => item.addEventListener('click', (_) => {
                        const template = context.posts[index].src;
                        (system.get('@post') as Actor<typeof PostDetailMachine>).send({ type: 'render', template });
                    }));

                    // set active animation to navigation buttons
                    const toggle = ((className: string, defaultElement: Element) => {
                        let lastActiveElement: Element = defaultElement;
                        return (input: Element) => {
                            lastActiveElement?.classList.remove(className);
                            lastActiveElement = input;
                            input?.classList.add(className);
                        };
                    })('activated', document.querySelector('nav > .activated')!);

                    document.querySelectorAll('nav > .btn')
                        .forEach((item) => item.addEventListener('click', (_) => toggle(item)));
                }
            ],
            // I was try these solutions
            // - onDone: { target: 'idle' }
            // - target: 'idle'
            // only this work
            always: 'idle',
        },
    }
});

const PostDetailMachine = setup({
    types: {
        context: {} as {
            ui: { body: HTMLElement, route: HTMLElement }
            template: string,
        },
        input: {} as {
            template: string
        },
        events: {} as AppEvents,
    },
    actors: {
        loadTemplateAsync: fromPromise(load_template),
    }
}).createMachine({
    initial: 'idle',
    context: ({ input }) => ({
        ui: {
            body: document.body,
            route: document.getElementById('route')!,
        },
        template: input.template,
    }),
    states: {
        idle: {
            on: { render: { target: 'render' } }
        },
        render: {
            invoke: {
                src: 'loadTemplateAsync',
                input: ({ event }) => (assertEvent(event, 'render'), {
                    name: event.template,
                }),
                onDone: {
                    actions: ({ context, event }) => render(event.output, context.ui.route),
                    target: 'idle',
                },
            },
        }
    },
})

// my idea is have multi child states and one basement state (`idle`)
// after a state execution successful, it always fallback to `idle` (using "always" config)
// `idle` state provide method to navigate to its child states
const RenderMachine = setup({
    types: {
        context: {} as {
            ui: { body: HTMLElement, route: HTMLElement },
        },
        events: {} as AppEvents,
    },
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.route);
        },
    },
    actors: {
        home_page: HomeMachine,
        post_detail: PostDetailMachine,
    },
}).createMachine({
    initial: "home_page",
    // manage other machine references
    invoke: [
        {
            src: 'home_page',
            systemId: '@home',
        },
        {
            src: 'post_detail',
            systemId: '@post',
            input: { template: 'sample_blog' },
        },
    ],
    // setup navbar actions
    entry: [
        ({self}) => {
            document.querySelector('.landing-page')?.addEventListener('click', (_) => self.send({ type: 'home_page' }));
            document.querySelector('.home')?.addEventListener('click', (_) => self.send({ type: 'home_page' }));
            document.querySelector('.detail')?.addEventListener('click', (_) => self.send({ type: 'detail_page'  }));
        },
    ],
    context: ({}) => ({
        ui: {
            body: document.body,
            route: document.getElementById('route')!,
        },
    }),
    states: {
        idle: {
            on: {
                home_page: 'home_page',
                detail_page: 'detail_page',
            },
        },
        // active `HomeMachine` by calling its reference
        home_page: {
            entry: sendTo(({system}) => system.get('@home'), { type: 'setup' }),
            always: 'idle',
        },
        // active `PostDetailMachine` by calling its reference
        detail_page: {
            entry: sendTo(({system}) => system.get('@post'), { type: 'render', template: 'sample_blog' } as AppEvents),
            always: 'idle',
        },
    },
});


export const $Renderer = createActor(RenderMachine);
