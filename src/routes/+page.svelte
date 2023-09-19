<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchQuery = '';
	let currentSearchTerm = '';

	const handleSubmit = async () => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			currentSearchTerm = urlParams.get('q') || '';
		}

		console.log(searchQuery, currentSearchTerm);
		if (searchQuery.trim() === currentSearchTerm.trim()) return;

		await goto(`/${encodeURIComponent(searchQuery.trim())}`, {
			invalidateAll: true
		});
	};
</script>

<h1>{data.welcome}</h1>
<form method="post" on:submit|preventDefault={handleSubmit}>
	<label for="username">LastFm username</label>
	<input bind:value={searchQuery} type="text" name="search" placeholder="Type lastFm username" />
	<button>GET MY STATS</button>
</form>
