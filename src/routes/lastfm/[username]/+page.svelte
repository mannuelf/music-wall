<script lang="ts">
	import fallBackImage from '$lib/images/default-img.svg';
	import type { PageData } from './$types';
	import AlbumCard from '$lib/components/albumCard/AlbumCard.svelte';
	import ArtistCard from '$lib/components/artistCard/ArtistCard.svelte';
	import LoadingIcon from '$lib/components/loadingIcon/LoadingIcon.svelte';

	export let data: PageData;

	$: user = data.streamed.user.user;
	$: artists = data.streamed.artists.topartists.artist;
	$: recentTracks = data.streamed.recentTracks.recenttracks.track;

	function handleImage(image: string) {
		if (image === '') return fallBackImage;
		return image;
	}
</script>

<section class="header">
	<h1>SCROBBLES</h1>
</section>

<!-- <section>
	<h2>Profile</h2>
	{#await user}
		<LoadingIcon />
	{:then user}
		<img src={handleImage(user.image[3]['#text'])} alt={user.name} />
		<h1>{user.realname}</h1>
		<p>{user.name}</p>
		<p>{user.country}</p>
		<p>{user.playcount}</p>
		<a href={user.url} target="_blank">My Profile</a>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</section> -->

<section>
	<h2>Recent Tracks</h2>
	{#await recentTracks}
		<LoadingIcon />
	{:then recentTracks}
		<div class="grid">
			{#each recentTracks as track}
				<AlbumCard {track} />
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</section>

<section>
	<h2>Top Artists</h2>
	{#await artists}
		<LoadingIcon />
	{:then artists}
		<div class="grid">
			{#each artists as artist}
				<ArtistCard {artist} />{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</section>

<style>
	section {
		background-color: var(--mint-cream);
		padding: 0;
	}

	.grid {
		display: grid;
		gap: 0rem;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
</style>
