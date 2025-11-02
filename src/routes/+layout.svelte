<script lang="ts">
    import type { LayoutProps } from './$types';
    import Icon from "@iconify/svelte";
    import "../app.css";
    import SearchInput from '$lib/widget/SearchInput.svelte';
    import SearchOutput from '$lib/widget/SearchFilter.svelte';
    import type { Action } from 'svelte/action';
    import Background from '$lib/widget/Background.svelte';
    import { AppState } from '$lib/state.svelte';
    import { onMount } from 'svelte';
    import type { Attachment } from 'svelte/attachments';

    let { children }: LayoutProps = $props();
    let searchText = $state('');
    let windowYOffset = $state(0);
    let search_input: HTMLInputElement | undefined = $state();

    const changeOnScroll: Action<HTMLElement,string[] | undefined,{}> = (node, data = ['py-0']) => {
        $effect(() => {
            if (windowYOffset > 50) {
                node.classList.add(...data);
            } else {
                node.classList.remove(...data);
            }
        });
    };

    const handleKeyboardInput = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'q') {
            search_input?.focus();
        }
    };

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
        AppState.isDark = document.documentElement.classList.contains('dark');
    };

    const activeMenu: Attachment = (self: Element) => {
        self.addEventListener('click', (_event) => {
            self.parentNode?.parentNode?.querySelectorAll('a').forEach(item => item.classList.remove('active'));
            self.classList.add('active');
        });
        return () => {};
    };

    const clearActiveMenu = () => {
        document.getElementById('app-menu')?.querySelectorAll('a').forEach(item => item.classList.remove('active'));
    };

    onMount(() => AppState.isDark = document.documentElement.classList.contains('dark'));
</script>

<svelte:head>
    <title>HaiTMT - Home</title>
</svelte:head>
<svelte:window bind:scrollY={windowYOffset} onkeydown={handleKeyboardInput}/>

<Background
shared="bg-base-300"
dark="[&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"
light="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"/>

<nav use:changeOnScroll
class="navbar bg-transparent text-base-content backdrop-blur-xs
pr-5 sticky top-0 z-50 transition-all">
    <div class="flex-none block">
        <a href="/" class="btn btn-ghost text-2xl" use:changeOnScroll={['']} onclick={() => clearActiveMenu()}>
            <svg width="100" height="60" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <!-- Gradient Definition -->
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00CFFF; stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF00FF; stop-opacity:1" />
                  </linearGradient>
                </defs>

                <!-- Square Shape -->
                <rect x="90" y="30" width="120" height="120" transform="rotate(45 150 90)" fill="url(#grad1)" />
                <rect x="125" y="65" width="50" height="50" transform="rotate(45 150 90)" fill="white" />

                <!-- Text -->
                <text x="50" y="170" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="url(#grad1)" letter-spacing="5">
                  HAI TMT
                </text>
            </svg>
        </a>
    </div>
    <div class="flex-1 flex justify-center">
        <div class="dropdown dropdown-center">
            <SearchInput exclass="m-auto w-full max-h-[90%] sm:max-h-full shadow-md"
            bind:self={search_input}
            bind:value={searchText}/>
            <SearchOutput
            exclass="dropdown-content shadow-sm w-full mt-2"
            search_input={searchText}
            />
        </div>
    </div>
    <div class="flex gap-4">
        <ul id="app-menu" class="menu menu-horizontal text-scale-base">
            <li><a href="/blog" {@attach activeMenu}>Blog</a></li>
            <li><a href="/showcase" {@attach activeMenu}>Showcase</a></li>
        </ul>
        <label class="swap swap-rotate self-center h-full text-scale-lg">
            <input type="checkbox" value="light" class="theme-controller" onclick={toggleDark} />
            <div class="swap-on"><Icon icon="noto:sun" /></div>
            <div class="swap-off"><Icon icon="noto-v1:crescent-moon" /></div>
        </label>
    </div>
</nav>

<main class="size-full min-h-screen">
    {@render children()}
</main>