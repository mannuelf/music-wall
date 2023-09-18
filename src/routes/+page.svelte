<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData | undefined;
	$: user = data ? data.user : undefined;
</script>

<form method="post">
	<label for="username">lastFm username</label>
	<input type="text" placeholder="Type lastFm username" />
	<button>GET MY DATA</button>
</form>

{#if user}
	<img src={user.image[3]['#text']} alt={user.name} />
	<h1>{user.realname}</h1>
	<p>{user.name}</p>
	<p>{user.country}</p>
	<p>{user.playcount}</p>
{/if}
