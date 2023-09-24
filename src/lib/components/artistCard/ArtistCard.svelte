<script lang="ts">
	import fallBackImage from '$lib/images/default-img.svg';
	import type { Artist, Image } from 'lastfm-nodejs-client/@types';

	export let artist: Artist;

	function handleCoverArt(images: Image[]): string {
		if (images.length === 0) return fallBackImage;
		return images
			.map((image) => {
				if (image.size === 'large') return image['#text'];
			})
			.join('');
	}
</script>

<article class="card">
	{#if artist.image}
		<img src={handleCoverArt(artist.image)} alt={artist.name} />
	{/if}
	<div class="card-content">
		{#if artist.name}<h3>{artist.name}</h3>{/if}
		{#if artist.url}
			<div class="card-content-info">
				<a href={artist.url} target="_blank"> Find out more </a>
			</div>
		{/if}
	</div>
</article>

<style>
	.card {
		width: 220px;
		height: 220px;
		overflow: hidden;
		cursor: pointer;
		position: relative;
	}

	.card img {
		position: absolute;
		object-fit: cover;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0.9;
		transition: opacity 0.2s ease-out;
	}

	.card h3 {
		position: absolute;
		inset: auto auto 30px 20px;
		margin: 0;
		transition: inset 0.2s 0.2s ease-out;
		font-weight: normal;
		text-transform: uppercase;
	}

	.card:hover h3 {
		inset: auto auto 160px 20px;
		transition: inset 0.2s ease-out;
	}

	.card .card-content-info {
		position: absolute;
		opacity: 0;
		max-width: 100%;
		transition: opacity 0.2s ease-out;
	}

	.card .card-content-info {
		inset: auto auto 0px 0px;
		width: 100%;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.card:hover .card-content-info {
		opacity: 1;
		transition: opacity 0.2s 0.1s ease-in;
	}

	.card:hover img {
		transition: opacity 0.3s ease-in;
		opacity: 1;
	}
</style>
