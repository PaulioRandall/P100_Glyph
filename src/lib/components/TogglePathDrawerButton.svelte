<script>
	let { canvas } = $props()

	function togglePathDrawing() {
		canvas.pathDrawing = !canvas.pathDrawing
	}
</script>

<button
	class="toggle-path-drawer-button" 
	onclick={togglePathDrawing}>
	{#if canvas.pathDrawing}
		Disable<br/>Path Drawing
	{:else}
		Enable<br/>Path Drawing
	{/if}
</button>

<style>
	/* TODO: Create button component */
	.toggle-path-drawer-button {
		height: 40px;

		cursor: pointer;

		&:disabled {
			cursor: not-allowed; 
		}
	}
</style>
