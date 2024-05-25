import { ActorRef, AnyActorRef, AnyEventObject, EventObject, MachineContext, MachineSnapshot, StateValue, createActor, enqueueActions, sendTo, setup } from "xstate";
import { BlogPost, HomePageTemplate } from "./component";
import { HTMLTemplateResult, html, render } from "lit-html";

type ARef<T extends MachineContext> = ActorRef<MachineSnapshot<T, AnyEventObject, Record<string, AnyActorRef | undefined>, StateValue, string, unknown, any>, AnyEventObject, EventObject>;

const HomeMachine = setup({
    types: {
        context: {} as {
            ui: {
                root: HTMLElement,
                items: HTMLElement[],
            },
            posts: BlogPost[],
            // ref: {
            //     parent: ARef<{
            //         ui: {
            //             body: HTMLElement;
            //             route: HTMLElement;
            //         };
            //     }>,
            // }
        },
        // input: {} as {
        //     parent: ARef<{
        //         ui: {
        //             body: HTMLElement;
        //             route: HTMLElement;
        //         };
        //     }>,
        // },
    },
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.root);
        },
    },
}).createMachine({
    initial: 'setup',
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
    entry: enqueueActions(({context, enqueue}) => {
        render(HomePageTemplate(context.posts), context.ui.root);
        let items = Array.from(context.ui.root.querySelectorAll('section'));
        enqueue.assign({
            ui: {
                root: context.ui.root,
                items,
            },
        });
    }),
    states: {
        setup: {
            entry: [
                ({context, system}) => {
                    context.ui.items.forEach(it => it.addEventListener('click', (_) => {
                        system.get('@post').send({ type: 'render' })
                    }));
                },
            ],
        },
        select: {},
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
    },

}).createMachine({
    initial: 'setup',
    context: ({ input }) => ({
        ui: {
            body: document.body,
            route: document.getElementById('route')!,
        },
        template: input.template,
    }),
    states: {
        setup: {
            // entry: ({context}) => {
            //     render(html`<h1>Hello World</h1>`, context.ui.route);
            // },
            on: {
                render: {
                    actions: ({context}) => {
                        render(html`<h1>Hello World</h1>`, context.ui.route);
                    }
                }
            }
        }
    },
})

const RenderMachine = setup({
    types: {
        context: {} as {
            ui: { body: HTMLElement, route: HTMLElement },
        },
    },
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.route);
        },
    },
    actors: {
        home_page: HomeMachine,
        post_detail: PostDetailMachine,
    }
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
    context: ({}) => ({
        ui: {
            body: document.body,
            route: document.getElementById('route')!,
        },
    }),
    states: {
        home_page: {
            description: "render home page which display list of blog posts",
            invoke: {
                src: 'home_page',
            },
            on: {
                view: 'detail_page',
                hello: {
                    actions: ({ system }) => {
                        console.log(system.get('home_detail'));
                        console.log("you are in state `home_page` event `hello`");
                    }
                },
            },
        },
        detail_page: {
            invoke: {
                src: 'post_detail',
                input: {
                    template: 'sample_blog',
                },
            },
        },
    },
    on: {
        home: {
            target: '.home_page',
        },
        detail: {
            actions: sendTo(({system}) => system.get('@post'), { type: 'render' }),
        },
    },
});


export const $Renderer = createActor(RenderMachine);