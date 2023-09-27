<script lang="ts">
	import ArtistCard from '$lib/components/artistCard/ArtistCard.svelte';
	import LoadingIcon from '$lib/components/loadingIcon/LoadingIcon.svelte';
	import TrackCard from '$lib/components/trackCard/TrackCard.svelte';
	import fallBackImage from '$lib/images/default-img.svg';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import AlbumCard from '$lib/components/albumCard/AlbumCard.svelte';
	import TopAlbumCard from '$lib/components/topAlbumCard/TopAlbumCard.svelte';

	export let data: PageData;

	$: lovedTracks = data.streamed.lovedTracks.lovedtracks.track;
	$: recentTracks = data.streamed.recentTracks.recenttracks.track;
	$: topAlbums = data.streamed.topAlbums.topalbums.album;
	$: topArtists = data.streamed.topArtists.topartists.artist;
	$: topTracks = data.streamed.topTracks.toptracks.track;
	$: user = data.streamed.user.user;
	$: weeklyAlbumChart = data.streamed.weeklyAlbumChart.weeklyalbumchart.album;
	$: weeklyArtistChart = data.streamed.weeklyArtistChart.weeklyartistchart.artist;
	$: weeklyChartList = data.streamed.weeklyChartList.weeklychartlist.chart;
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
		<h2>Top Tracks</h2>
		{#await topTracks}
			<LoadingIcon />
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
			<LoadingIcon />
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
			<LoadingIcon />
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

	<hr>

	<section>
		<h2>Loved Tracks</h2>
		{#await lovedTracks}
			<LoadingIcon />
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
		<h2>Recent Tracks</h2>
		{#await recentTracks}
			<LoadingIcon />
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
			<LoadingIcon />
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
			<LoadingIcon />
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
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
</style>
