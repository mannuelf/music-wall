<script lang="ts">
	import fallBackImage from '$lib/images/default-img.svg';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;

	function handleImage(image: string) {
		if (image === '') return fallBackImage;
		return image;
	};
</script>

<a href="/">SEARCH AGAIN</a>

<div>
	{#if user}
		<img src={handleImage(user.image[3]['#text'])} alt={user.name} />
		<h1>{user.realname}</h1>
		<p>{user.name}</p>
		<p>{user.country}</p>
		<p>{user.playcount}</p>
	{/if}
</div>
