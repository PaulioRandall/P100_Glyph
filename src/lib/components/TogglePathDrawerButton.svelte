<script>
	import TextButton from './TextButton.svelte'

	let { canvas } = $props()

	function togglePathDrawing() {
		canvas.pathDrawing = !canvas.pathDrawing
	}
</script>

<TextButton onclick={togglePathDrawing}>
	{#if canvas.pathDrawing}
		Disable<br/>Path Drawing
	{:else}
		Enable<br/>Path Drawing
	{/if}
</TextButton>
