<script lang="ts">
	import AlbumCard from '$lib/components/albumCard/AlbumCard.svelte';
	import ArtistCard from '$lib/components/artistCard/ArtistCard.svelte';
	import LoadingIcon from '$lib/components/loadingIcon/LoadingIcon.svelte';
	import fallBackImage from '$lib/images/default-img.svg';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.streamed.user.user;
	$: artists = data.streamed.artists.topartists.artist;
	$: recentTracks = data.streamed.recentTracks.recenttracks.track;
	$: lovedTracks = data.streamed.lovedTracks.lovedtracks.track;
	$: weeklyTrackCharts = data.streamed.weeklyTrackChart.weeklytrackchart.track;

	function handleImage(image: string) {
		if (image === '') return fallBackImage;
		return image;
	}
</script>

<section class="flex flex-col">
	<section class="header hidden">
		<h1>SCROBBLES</h1>
	</section>

	<section>
		<h2 class="hidden">Profile</h2>
		{#await user}
			<LoadingIcon />
		{:then user}
			<div class="flex flex-col">
				<div>
					<h1>{user.realname}</h1>
					<p>{user.country}</p>
				</div>
				<div><Avatar src={handleImage(user.image[3]['#text'])} alt={user.name} size="large" /></div>
				<div>
					<p>{user.playcount}</p>
					<a href={user.url} target="_blank">My Profile</a>
				</div>
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Loved Tracks</h2>
		{#await lovedTracks}
			<LoadingIcon />
		{:then lovedTracks}
			<div class="grid">
				{#each lovedTracks as track}
					<AlbumCard {track} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

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
		<h2>Weekly track charts</h2>
		{#await weeklyTrackCharts}
			<LoadingIcon />
		{:then weeklyTrackCharts}
			<div class="grid">
				{#each weeklyTrackCharts as track}
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
					<ArtistCard {artist} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>
</section>

<style>
	section {
		background-color: var(--mint-cream);
		padding: 0;
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
</style>
