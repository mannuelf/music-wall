<script lang="ts">
	import fallBackImage from '$lib/images/default-img.svg';
	import type { Image, WeeklyAlbum } from 'lastfm-nodejs-client/dist/@types/lastfm.types';

	export let album: WeeklyAlbum;
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
	{#if album.image}
		<img src={album.image} alt={album.name} loading="lazy" />
	{/if}
	<div class="card-content">
		{#if album.name}<h3>{album.name}</h3>{/if}
		<div class="card-content-info">
			<p>
				{#if album.artist}{album.artist['#text']} <br />{/if}
				{#if album.album}{album.album['#text']}{/if}
			</p>
			{#if album.url}<a href={album.url} target="_blank">Find out more</a>{/if}
		</div>
	</div>
</article>

<style>
	.card {
		width: 100%;
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
