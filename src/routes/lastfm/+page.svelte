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
	<form method="post" on:submit|preventDefault={handleSubmit} class="grid grid-cols-2 gap-4">
		<label for="username" class="label"
			> <span class="hidden">Enter username</span>
			<input
				bind:value={searchQuery}
				class="input"
				type="text"
				name="search"
				placeholder="Type lastFm username"
			/>
			</label
		><button class="btn variant-filled-primary w-40">GET MY STATS</button>
	</form>
</section>
