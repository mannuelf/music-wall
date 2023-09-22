<script lang="ts">
	import fallBackImage from '$lib/images/default-img.svg';
	import type { Image } from 'lastfm-nodejs-client/@types';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user.user;
	$: artists = data.artists.topartists.artist;
	$: recentTracks = data.recentTracks.recenttracks.track;

	function handleImage(image: string) {
		if (image === '') return fallBackImage;
		return image;
	}

	function handleCoverArt(images: Image[]): string {
		if (images.length === 0) return fallBackImage;
		return images
			.map((image) => {
				if (image.size === 'large') return image['#text'];
			})
			.join('');
	}
</script>

<a href="/">SEARCH AGAIN</a>

<section><h1>SCROBBLES</h1></section>

<section>
	<h2>Profile</h2>
	{#if user}
		<img src={handleImage(user.image[3]['#text'])} alt={user.name} />
		<h1>{user.realname}</h1>
		<p>{user.name}</p>
		<p>{user.country}</p>
		<p>{user.playcount}</p>
		<a href={user.url} target="_blank">My Profile</a>
	{/if}
</section>

<section>
	<h2>Top Artists</h2>
	{#if artists}
		{#each artists as artist}
			<h3>{artist.name}</h3>
			{#if artist.image}
				<img src={handleCoverArt(artist.image)} alt={artist.name} />
			{/if}
		{/each}
	{/if}
</section>

<section>
	<h2>Recent Tracks</h2>
	{#if recentTracks}
		{#each recentTracks as track}
			<h3>{track.name}</h3>
			<p>{track.artist['#text']}</p>
			<p>{track.album['#text']}</p>
			<p>{track.date['#text']}</p>
			{#if track.image}
				<img src={handleCoverArt(track.image)} alt={track.name} />
			{/if}
		{/each}
	{/if}
</section>


