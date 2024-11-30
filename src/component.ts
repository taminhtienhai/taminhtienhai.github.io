import { html } from "lit-html";
import { repeat_template } from "./helper";

export class BlogPost {
    id = 0;
    title = "";
    sub_title = "";
    tags: string[] = [];
    brief =  "";
    description = "";
    src = "";

    constructor(id: number, title: string, tags: string[] = [], src = "") {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.src = src;
    }
}

/**
 * Render list of blog
 * - [ ] Style: make content a bit center
 */
export const BlogPostTemplate = (src?: BlogPost) => html`
    <section 
        class="
        card card-compact bg-base-300 shadow-xl
        m-5 rounded-xl px-2 py-1 cursor-pointer
        "
    >
        <small class="hover:text-fuchsia-300 transition">2023-01-07</small>
        <h3 class="card-title title mt-1">${src?.title}</h3>
        <h5 class="text-sm my-2">${src?.sub_title}</h5>
        <span>
        ${repeat_template(
            src?.tags ?? [],
            (tag) => html`<i class="badge badge-outline text-xs">#${tag}</i>`)}
        </span>
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