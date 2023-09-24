<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let searchQuery = '';
	let currentSearchTerm = '';

	const handleSubmit = async () => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			currentSearchTerm = urlParams.get('q') || '';
		}

		if (searchQuery.trim() === currentSearchTerm.trim()) return;

		await goto(`lastfm/${encodeURIComponent(searchQuery.trim())}`, {
			invalidateAll: true
		});
	};
</script>
<section>
	<form method="post" on:submit|preventDefault={handleSubmit}>
		<label for="username">LastFm username</label>
		<input bind:value={searchQuery} type="text" name="search" placeholder="Type lastFm username" />
		<button>GET MY STATS</button>
	</form>
</section>
<h1>LastFm</h1>
