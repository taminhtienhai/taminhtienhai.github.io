import { html } from "lit-html";
import { repeat_template } from "./helper";

export class BlogPost {
    id: number = 0;
    title: string = "";
    sub_title: string = "";
    tags: string[] = [];
    description: string = "";

    constructor(id: number, title: string, tags: string[] = []) {
        this.id = id;
        this.title = title;
        this.tags = tags;
    }
}

export const BlogPostTemplate = (src?: BlogPost) => html`
    <section class="m-5 rounded-xl">
        <article class="bg-#435585 text-#F5E8C7 rounded-xl px-2 py-1">
            <small>2023-01-07</small>
            <h3 class="text-xl mt-1">${src?.title}</h3>
            <h5 class="text-sm my-2">${src?.sub_title}</h5>
            <span>
                ${repeat_template(src?.tags ?? [], (tag) => html`<i class="chip">#${tag}</i>`)}
            </span>
        </article>
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