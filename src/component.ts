import { html } from "lit-html";
import { repeat_template } from "./helper";

export class BlogPost {
    id: number = 0;
    title: string = "";
    sub_title: string = "";
    tags: string[] = [];
    description: string = "";
    src: string = "";

    constructor(id: number, title: string, tags: string[] = [], src = "") {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.src = src;
    }
}

export const BlogPostTemplate = (src?: BlogPost) => html`
    <section class="m-5 bg-#D4A373 text-#435585 rounded-xl px-2 py-1" hover="cursor-pointer">
        <small hover="text-fuchsia" transition>2023-01-07</small>
        <h3 class="title" text-xl mt-1 >${src?.title}</h3>
        <h5 class="sub_title" text-sm my-2>${src?.sub_title}</h5>
        <span class="tag">${repeat_template(src?.tags ?? [], (tag) => html`<i class="chip-gray">#${tag}</i>`)}</span>
    </section>
`;


export const XStateTemplate = () => html`
    <button class="btn home">HomePage</button>
    <button class="btn detail">PageDetail</button>
`;

export const HomePageTemplate = (posts: BlogPost[]) => html`
    ${repeat_template(posts, BlogPostTemplate)}
`;

export const PostDetailTemplate = () => html`
<h1>This is post detail template</h1>
`;