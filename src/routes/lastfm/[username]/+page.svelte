<script lang="ts">
	import ArtistCard from '$lib/components/artistCard/ArtistCard.svelte';
	import TrackCard from '$lib/components/trackCard/TrackCard.svelte';
	import fallBackImage from '$lib/images/default-img.svg';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import AlbumCard from '$lib/components/albumCard/AlbumCard.svelte';
	import TopAlbumCard from '$lib/components/topAlbumCard/TopAlbumCard.svelte';
	import LoadingCardShell from '$lib/components/loadingCardShell/LoadingCardShell.svelte';

	export let data: PageData;

	$: lovedTracks = data.streamed.lovedTracks.then((data) => data.lovedtracks.track);
	$: lovedTracksLength = lovedTracks.then((data) => data.length);

	$: recentTracks = data.streamed.recentTracks.then((data) => data.recenttracks.track);
	$: recentTracksLength = recentTracks.then((data) => data.length);

	$: topAlbums = data.streamed.topAlbums.then((data) => data.topalbums.album);
	$: topAlbumsLength = topAlbums.then((data) => data.length);

	$: topArtists = data.streamed.topArtists.then((data) => data.topartists.artist);
	$: topArtistsLength = topArtists.then((data) => data.length);

	$: topTracks = data.streamed.topTracks.then((data) => data.toptracks.track);
	$: topTracksLength = topTracks.then((data) => data.length);

	$: user = data.streamed.user.then((data) => data.user);

	$: weeklyAlbumChart = data.streamed.weeklyAlbumChart.then((data) => data.weeklyalbumchart.album);
	$: weeklyAlbumChartLength = weeklyAlbumChart.then((data) => data.length);

	$: weeklyArtistChart = data.streamed.weeklyArtistChart.then(
		(data) => data.weeklyartistchart.artist
	);
	$: weeklyArtistChartLength = weeklyArtistChart.then((data) => data.length);

	$: weeklyTrackCharts = data.streamed.weeklyTrackChart.then((data) => data.weeklytrackchart.track);
	$: weeklyTrackChartsLength = weeklyTrackCharts.then((data) => data.length);

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
			loading...
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
		<h2>Weekly Artist Chart</h2>
		{#await weeklyArtistChart}
			<div class="grid gap-4">
				<LoadingCardShell numCols={weeklyArtistChartLength} />
			</div>
		{:then weeklyArtistChart}
			<div class="grid">
				{#each weeklyArtistChart as artist}
					<ArtistCard {artist} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Loved Tracks</h2>
		{#await lovedTracks}
			<div class="grid gap-4">
				<LoadingCardShell numCols={lovedTracksLength} />
			</div>
		{:then lovedTracks}
			<div class="grid">
				{#each lovedTracks as track}
					<TrackCard {track} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Top Tracks</h2>
		{#await topTracks}
			<div class="grid gap-4">
				<LoadingCardShell numCols={topTracksLength} />
			</div>
		{:then topTracks}
			<div class="grid">
				{#each topTracks as track}
					<TrackCard {track} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Top Artists</h2>
		{#await topArtists}
			<div class="grid gap-4">
				<LoadingCardShell numCols={topArtistsLength} />
			</div>
		{:then topArtists}
			<div class="grid">
				{#each topArtists as artist}
					<ArtistCard {artist} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Top Albums</h2>
		{#await topAlbums}
			<div class="grid gap-4">
				<LoadingCardShell numCols={topAlbumsLength} />
			</div>
		{:then topAlbums}
			<div class="grid">
				{#each topAlbums as album}
					<TopAlbumCard {album} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Recent Tracks</h2>
		{#await recentTracks}
			<div class="grid gap-4">
				<LoadingCardShell numCols={recentTracksLength} />
			</div>
		{:then recentTracks}
			<div class="grid">
				{#each recentTracks as track}
					<TrackCard {track} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Weekly track charts</h2>
		{#await weeklyTrackCharts}
			<div class="grid gap-4">
				<LoadingCardShell numCols={weeklyTrackChartsLength} />
			</div>
		{:then weeklyTrackCharts}
			<div class="grid">
				{#each weeklyTrackCharts as track}
					<TrackCard {track} />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</section>

	<section>
		<h2>Weekly Album Charts</h2>
		{#await weeklyAlbumChart}
			<div class="grid gap-4">
				<LoadingCardShell numCols={weeklyAlbumChartLength} />
			</div>
		{:then weeklyAlbumChart}
			<div class="grid">
				{#each weeklyAlbumChart as album}
					<AlbumCard {album} />
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
		margin-bottom: 2em;
	}

	h2 {
		font-size: 2em;
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
</style>
