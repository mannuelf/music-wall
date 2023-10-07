<script lang="ts">
	const animate: boolean = true;
	export let numRows: number = 10;
	export let numCols: number = 10;
</script>

{#each Array(numRows) as _, rowIndex}
	<div class="space-y-4 p-4" data-column-id={rowIndex} class:animate-pulse={animate}>
		<div class="placeholder h-40 rounded-md" />
		<div class="grid grid-cols-{numCols} gap-4">
			{#each Array(numCols) as _, colIndex}
				<div class="placeholder rounded-md" data-column-id={colIndex}></div>
			{/each}
		</div>
		<div class="placeholder rounded-md"></div>
	</div>
{/each}
