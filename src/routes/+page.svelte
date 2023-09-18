<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data ? data.user : null;

	let searchQuery = '';
	let currentSearchTerm = '';

	const handleSubmit = async () => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			currentSearchTerm = urlParams.get('q') || '';
		}

		if (searchQuery.trim() === currentSearchTerm.trim()) return;

		await goto(`/?q=${encodeURIComponent(searchQuery.trim())}`, {
			invalidateAll: true
		});
	};
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<label for="username">lastFm username</label>
	<input bind:value={searchQuery} type="text" name="search" placeholder="Type lastFm username" />
	<button>GET MY DATA</button>
</form>

{#if user}
	<img src={user.image[3]['#text']} alt={user.name} />
	<h1>{user.realname}</h1>
	<p>{user.name}</p>
	<p>{user.country}</p>
	<p>{user.playcount}</p>
{/if}
