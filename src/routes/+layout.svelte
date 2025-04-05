<script lang="ts">
    import type { LayoutProps } from './$types';
    import Icon from "@iconify/svelte";
    import "../app.css";
    import SearchInput from '$lib/widget/SearchInput.svelte';
    import SearchOutput from '$lib/widget/SearchFilter.svelte';
    import type { Action } from 'svelte/action';

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
</script>

<svelte:head>
    <title>HaiTMT Blog</title>
</svelte:head>
<svelte:window bind:scrollY={windowYOffset} onkeydown={handleKeyboardInput}/>

<nav use:changeOnScroll
class="navbar bg-base-100 text-base-content
shadow-sm pr-5 sticky top-0 z-50 transition-all">
    <div class="flex-none hidden sm:block">
        <a href="/" class="btn btn-ghost text-2xl" use:changeOnScroll={['hidden']}>
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
            <SearchInput exclass="m-auto w-full max-h-[90%] sm:max-h-full"
            bind:self={search_input}
            bind:value={searchText}/>
            <SearchOutput
            exclass="dropdown-content shadow-sm w-full mt-2"
            search_input={searchText}
            />
        </div>
    </div>
    <div class="flex gap-4">
        <ul class="menu menu-horizontal text-scale-base">
            <li><a href="/blog">Blog</a></li>
            <li><a href="/showcase">Showcase</a></li>
        </ul>
        <label class="swap swap-rotate self-center h-full text-scale-lg">
            <input type="checkbox" value="light" class="theme-controller" />
            <div class="swap-on"><Icon icon="noto:sun" /></div>
            <div class="swap-off"><Icon icon="noto-v1:crescent-moon" /></div>
        </label>
    </div>
</nav>

<main class="w-full min-h-screen bg-base-200">
    {@render children()}
</main>
