<script>
	let { canvas } = $props()
</script>

<button
	class="enter-select-mode-button" 
	onclick={() => canvas.enterSelectMode()}>
	Select Mode
</button>

<style>
	/* TODO: Create button component */
	.enter-select-mode-button {
		height: 40px;

		cursor: pointer;

		&:disabled {
			cursor: not-allowed; 
		}
	}
</style>
