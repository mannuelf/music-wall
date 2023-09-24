<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>


<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">MUSIC WALL</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/lastfm"
				>
					LastFm
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/spotify"
				>
					Spotify
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/mannuelf/music-wall"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>


<style lang="css">
	/* coolors.co https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d */
	:root {
		--midnight-green: hsla(188, 56%, 23%, 1);
		--robin-egg-blue: hsla(176, 56%, 55%, 1);
		--mint-cream: hsla(120, 100%, 98%, 1);
		--light-red: hsla(0, 100%, 71%, 1);
		--naples-yellow: hsla(50, 100%, 71%, 1);
	}

	:global(body) {
		font-family: 'Poppins', Arial, Helvetica, sans-serif;
		background-color: var(--mint-cream);
		padding: 0;
		margin: 0;
	}
</style>
