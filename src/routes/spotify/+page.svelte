<script lang="ts">
import type { PageData } from './$types';
	
	export let data: PageData;
  $: thing = data.streamed.three
</script>

<h1>Spotify</h1>
<p>
	one: {data.one}
</p>
<p>
	two: {data.two}
</p>
<p>
	three:
	{#await thing}
		Loading...
	{:then value}
		{value}
	{:catch error}
		{error.message}
	{/await}
</p>
