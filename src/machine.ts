import { createActor, setup, spawnChild } from "xstate";
import { BlogPost, HomePageTemplate, PostDetailTemplate } from "./component";
import { HTMLTemplateResult, render } from "lit-html";

type AppContext = {
    ui: { body: HTMLElement, route: HTMLElement | null },
    posts: BlogPost[],
};

const HomeMachine = setup({
    types: {
        context: {} as {
            ui: {
                root: HTMLElement,
            },
            posts: BlogPost[],
        },
    },
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.root);
        },
    },
}).createMachine({
    initial: 'render',
    context: {
        ui: {
            root: document.getElementById('route')!,
        },
        posts: [
            new BlogPost(0, "Participate Advent of Code for the first time", ["rust", "js"]),
            new BlogPost(1, "Participate Advent of Code for the second time", ["python"]),
            new BlogPost(2, "Participate Advent of Code for the third time", ["c++"]),
        ],
    },
    states: {
        render: {
            entry: [
                {
                    type: "loadUI",
                    params: ({context}) => ({ template: HomePageTemplate(context.posts) }),
                }
            ]
        },
        select: {},
    }
});

const RenderMachine = setup({
    actions: {
        loadUI: ({ context }, { template }: { template: HTMLTemplateResult }) => {
            render(template, context.ui.route!);
        },
    },
    types: {
        context: {} as AppContext,
    },
    actors: {

    }
}).createMachine({
    id: "page_renderer",
    initial: "home_page",
    entry: [
    ],
    context: {
        ui: {
            body: document.body,
            route: document.getElementById('route'),
        },
        posts: [
            new BlogPost(0, "Participate Advent of Code for the first time", ["rust", "js"]),
            new BlogPost(1, "Participate Advent of Code for the second time"),
            new BlogPost(2, "Participate Advent of Code for the third time"),
        ],
    },
    states: {
        home_page: {
            description: "render home page which display list of blog posts",
            invoke: {
                src: 'home',
            },
            entry: [
                (ctx) => {
                    console.log("exit home_page");
                },
            ],
            exit: [
                (ctx) => {
                    console.log("exit home_page");
                },
            ],
            on: {
                'view': 'detail_page',
            },
        },
        detail_page: {
            entry: [
                {
                    type: "loadUI",
                    params: { template: PostDetailTemplate() },
                }
            ],
            exit: [
                (ctx) => {
                    console.log("exit detail_page");
                },
            ],
            on: {
                'back': 'home_page',
            },
        },
    },
});


export const $Renderer = createActor(RenderMachine);