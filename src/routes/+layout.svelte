<script lang="ts">
	import Analytics from '$lib/analytics.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">MUSIC WALL</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Navigation />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<section class="p-4">
		<slot><!-- optional fallback --></slot>
	</section>

	<Analytics />
</AppShell>
