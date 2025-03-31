<script lang="ts">
    import { getBadgeColor } from "../common/constant";
    import Tag from "./Tag.svelte";

    type PostCardParams = {
        title: string;
        subtitle?: string;
        description?: string;
        is_new?: boolean;
        created_date?: string;
        tags?: string[];
        link?: string;
    };

    const {
        title,
        is_new = true,
        created_date = '2025-03-20',
        description,
        subtitle,
        tags = [],
        link = '',
    }: PostCardParams = $props();

    const badge_colors = ['badge-primary', 'badge-secondary', 'badge-info', 'badge-warning', 'badge-success', 'basdge-neutral', 'badge-error'];
</script>

<section class="card card-xs sm:card-sm md:card-sm lg:card-md xl:card-md 2xl:card-lg
bg-base-100 shadow-sm max-w-2xl w-auto indicator">
    <div class="indicator-item badge badge-secondary right-0"
    class:hidden={is_new}>new</div>
    <div class="card-body cursor-auto py-3 sm:py-6">
        <a href="/post/{link}" class="card-title group hover:cursor-pointer">
            <span class="group-hover:underline">{title}</span>
            <span class="ml-auto text-xs sm:text-sm font-light font-mono min-w-fit">{created_date}</span>
        </a>
        <span class="sm:text-sm/tight font-light text-base-content/50">{subtitle}</span>
        <p class="overflow-ellipsis line-clamp-2">{description}</p>
        <div class="flex gap-2 justify-end mt-2">
            {#each tags as tag}
            {@const bcolor = getBadgeColor(tag)}
            <Tag text={tag} color={bcolor} tooltip="programming language"/>
            {/each}
        </div>
    </div>
</section>