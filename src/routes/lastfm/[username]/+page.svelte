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

	$: lovedTracks = data.streamed.lovedTracks;
	$: lovedTracksLength = lovedTracks;

	$: recentTracks = data.streamed.recentTracks;
	$: recentTracksLength = recentTracks;

	$: topAlbums = data.streamed.topAlbums;
	$: topAlbumsLength = topAlbums;

	$: topArtists = data.streamed.topArtists;
	$: topArtistsLength = 10;

	$: topTracks = data.streamed.topTracks;
	$: topTracksLength = topTracks;

	$: user = data.streamed.user.then((data) => data.user);

	$: weeklyAlbumChart = data.streamed.weeklyAlbumChart;
	$: weeklyAlbumChartLength = weeklyAlbumChart;

	$: weeklyArtistChart = data.streamed.weeklyArtistChart;
	$: weeklyArtistChartLength = weeklyArtistChart;

	$: weeklyTrackCharts = data.streamed.weeklyTrackChart;
	$: weeklyTrackChartsLength = weeklyTrackCharts;

	function handleImage(image: string) {
		if (image === '') return fallBackImage;
		return image;
	}
</script>

<section class="grid">
	<div>
		<h2 class="hidden">Profile</h2>
		{#await user}
			loading...
		{:then user}
			<div class="grid">
				<div><Avatar src={handleImage(user.image[3]['#text'])} alt={user.name} size="large" /></div>
				<div>
					<h1 class="font-bold">{user.realname}</h1>
					<p>{user.country}</p>
				</div>
				<div>
					<p><span class="text-primary-500 font-bold">{user.playcount}</span> plays</p>
					<a href={user.url} target="_blank">LastFm Profile ↗️ </a>
				</div>
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
	<div>
		<form method="POST" class="grid content-center">
			<label for="limit" class="label self-end">
				<span>Limit <i class="text-primary-300 text-sm">(amount of pictures to show)</i></span>
				<input autocomplete="off" name="limit" type="text" placeholder="10" class="input" />
			</label>
			<label for="period" class="self-end">
				<span>Period</span>
				<select name="period" id="period" class="select">
					<option value="7" selected>7 Days</option>
					<option value="14">14 Days</option>
					<option value="30">30 Days</option>
					<option value="60">60 Days</option>
					<option value="90">90 Days</option>
					<option value="120">120 Days</option>
					<option value="180">180 Days</option>
					<option value="360">360 Days</option>
				</select>
			</label>
			<label class="self-end">
				<button class="btn btn-m variant-filled-primary">SUBMIT</button>
			</label>
		</form>
	</div>
</section>

<section class="flex flex-col">
	<section class="header hidden">
		<h1>SCROBBLES</h1>
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
