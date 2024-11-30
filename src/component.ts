import { html } from "lit-html";
import { repeat_template } from "./helper";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

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
        blog-post-item
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

export const BlogTemplate = (posts: BlogPost[]) => html`
    <section class="pl-10%">
        <h1>Welcome everyone that come to my blog</h1>
        <br>
        <p>If you are interesting on <small class="">#java</small>, <small>#javascript</small> and specially <span class="iconify mdi--language-rust"></span> <small>#rust</small>. This is the right place.</p>
    </section>
    <section>
        ${repeat_template(posts, BlogPostTemplate)}
    </section>
`;

export const PostDetailTemplate = (content: string) => html`
    <article class="prose">${unsafeHTML(content)}</article>
`;

export const MeTemplate = () => html`
<section class="card card-side bg-base-100 shadow-xl">
    <figure class="w-24 rounded-sm">
        <img src="/imgs/avatar_20241130.png" alt="my_avatar">
    </figure>
    <aside class="card-body">
        <span class="iconify jam--sword-f text-red-200"></span>
        <span class="iconify jam--shield-f text-gray-400"></span>
        <span class="iconify jam--heart-f text-green-200"></span>
    </aside>
</section>
`;

export const ErrorMessage = (msg: string) => html`<p class="error">${msg}</p>`;