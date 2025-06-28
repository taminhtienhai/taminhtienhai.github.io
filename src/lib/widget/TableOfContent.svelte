<script lang="ts">
    import { onMount } from "svelte";
    import type { Heading, TOC } from "../common/types";
    import {render} from "lit-html";
    import { TOCNode, TOCTree } from "../common/toc";

    let { title, headings }: TOC = $props();

    /// level 1-5
    const font_weights = ['font-bold','font-semibold', 'font-medium', 'font-light', 'font-font-light'];
    const text_sizes = ['text-2xl','text-xl','text-lg','text-md','text-sm'];;
    const paddings = ['pl-1', 'pl-5', 'pl-9', 'pl-11', 'pl-13'];

    const idGen = (startFrom: number = 0) => {
        let count = startFrom;
        return () => `toc_${count++}`;
    }

    function renderTOCItems(node: HTMLUListElement) {
        let toc_tree = new TOCTree({ id: '', level: 0, text: "Title" } as Heading);
        for (const item of headings) {
            toc_tree.append(new TOCNode(item), item.level);
        }
        const toc = toc_tree.buildToc(idGen(), toc_tree.root)
        render(toc, node);
    }
</script>

<nav class="sm:py-2 sm:px-1 md:py-3 md:px-1 lg:py-4 lg:px-2
border border-base-content/30 rounded-xl bg-transparent
max-w-xs max-h-[calc(100vh-(--spacing(20)))] mx-auto
overflow-y-scroll scrollbar scrollbar-thumb-base-content/10 scrollbar-thumb-rounded-lg
**:max-w-[100%] **:text-nowrap **:[&_li]:overflow-x-hidden">
    <ul class="menu menu-sm md:menu-md
    sm:bg-base-200 rounded-box"
    {@attach renderTOCItems}>
        <!-- <h2 class="menu-title text-xl">{title ?? "Unknown"}</h2> -->
    </ul>
</nav>