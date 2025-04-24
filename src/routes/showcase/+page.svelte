<script>
    import TableOfContent from "$lib/widget/TableOfContent.svelte";
    import DropdownMenu from "$lib/widget/DropdownMenu.svelte";
    import PostCard from "$lib/widget/PostCard.svelte";
    import SearchPanel from "$lib/widget/SearchFilter.svelte";
    import LoginForm from "$lib/widget/LoginForm.svelte";
</script>

<svelte:head>
    <title>HaiTMT - Showcase</title>
</svelte:head>

<p class="text-5xl font-bold pt-10 text-center">Component Showcase</p>

<div class="divider text-2xl font-bold my-20">
Table of Contents
</div>

<section class="w-full flex justify-center">
    <TableOfContent title="Sample TOC" headings={[
        { level: 1, text: 'Head1' },
        { level: 2, text: 'Head2' },
        { level: 2, text: 'Head3' },
        { level: 3, text: 'Head4' },
        { level: 3, text: 'Head5' },
        { level: 2, text: 'Head6' },
    ]}/>
</section>

<div class="divider text-2xl font-bold my-20">
Dropdown Menu
</div>
<section class="w-full flex justify-center">
<DropdownMenu text="hello" items={['abc', 'xya']} />
</section>


<div class="divider text-2xl font-bold my-20">
    PostCard
</div>

<section class="w-full flex justify-center">
<PostCard
    title="2 years at VNG"
    subtitle="how do I survive?"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    tags={['js', 'c']}
    />
</section>

<div class="divider text-2xl font-bold my-20">
    SearchPanel
</div>

<section class="w-full flex justify-center">
<SearchPanel/>
</section>

<div class="divider text-2xl font-bold my-20">
    Login Form
</div>
<section class="w-full flex justify-center">
<LoginForm/>
</section>

<div class="footer h-36"></div>