<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<h1>404</h1>
	<p>Page not found</p>
{:else if $page.status === 400}
	<h1>{$page.status}</h1>
	<p>Something went wrong</p>
{/if}
