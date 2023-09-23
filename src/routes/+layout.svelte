<script lang="ts"></script>

<slot />

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
