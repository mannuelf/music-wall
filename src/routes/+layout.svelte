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

		await goto(`/${encodeURIComponent(searchQuery.trim())}`, {
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

<slot />

<style lang="css">
	/* coolors.co https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d */
	:root {
		--midnight-green: hsla(188, 56%, 23%, 1);
		--robin-egg-blue: hsla(176, 56%, 55%, 1);
		--mint-cream: hsla(120, 100%, 98%, 1);
		--light-red: hsla(0, 100%, 71%, 1);
		--naples-yellow: hsla(50, 100%, 71%, 1);
	}

	:global(body) {
		font-family: 'Poppins', Arial, Helvetica, sans-serif;
		background-color: var(--mint-cream);
		padding: 0;
		margin: 0;
	}
</style>
