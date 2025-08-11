<script lang="ts">
	import { page } from '$app/state';
    // import { PageData } from './$types';

</script>

{#if page.status === 404}
    <h1 class="text-4xl text-primary-content/30 mt-5">Tag '{page.params.blog}' not found</h1>
{/if}
