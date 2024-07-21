import { Actor, assertEvent, createActor, fromPromise, sendTo, setup } from "xstate";
import { BlogPost, HomePageTemplate } from "./component";
import { HTMLTemplateResult, render } from "lit-html";
import { load_template_async } from "./helper";

type AppEvents = 
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
}).createMachine({
    initial: 'idle',
    context: {
        ui: {
            root: document.getElementById('route')!,
            items: [],
        },
        posts: [
            new BlogPost(0, "Participate Advent of Code for the first time", ["rust", "js"], "first_attempt"),
            new BlogPost(1, "Participate Advent of Code for the second time", ["python"], "second_attempt"),
            new BlogPost(2, "Participate Advent of Code for the third time", ["c++"], "third_attempt"),
        ],
    },
    states: {
        idle: {
            on: {
                render: {
                    target: 'render',
                }
            },
        },
        render: {
            entry: ({context, system}) => {
                render(HomePageTemplate(context.posts), context.ui.root);
                context.ui.root.querySelectorAll('section').forEach((item, index) => item.addEventListener('click', (_) => {
                    let template = context.posts[index].src;
                    (system.get('@post') as Actor<typeof PostDetailMachine>).send({ type: 'render', template });
                }));

                let toggle = ((className: string, defaultElement: Element) => {
                    let lastActiveElement: Element = defaultElement;
                    return (input: Element) => {
                        lastActiveElement?.classList.remove(className);
                        lastActiveElement = input;
                        input?.classList.add(className);
                    };
                })('activated', document.querySelector('nav > .activated')!);

                document.querySelectorAll('nav > .btn')
                    .forEach((item) => item.addEventListener('click', (_) => toggle(item)));
            },
            // I was try these below solutions
            // - onDone: { target: 'idle' }
            // - target: 'idle'
            // only this can work
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
        loadTemplateAsync: fromPromise(load_template_async),
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
        home_page: {
            entry: sendTo(({system}) => system.get('@home'), { type: 'render' }),
            always: 'idle',
        },
        detail_page: {
            entry: sendTo(({system}) => system.get('@post'), { type: 'render', template: 'sample_blog' } as AppEvents),
            always: 'idle',
        },
    },
});


export const $Renderer = createActor(RenderMachine);