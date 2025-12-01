
<script>
	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')

	function deleteElement() {
		if (diagram.selected) {
			diagram.remove(diagram.selected) 
		}
	}
</script>

<button
	disabled={!diagram.selected}
	class="delete-element-button" 
	onclick={deleteElement}>
	Delete
</button>

<style>
	.delete-element-button {
		height: 40px;

		cursor: pointer;

		&:disabled {
			cursor: not-allowed; 
		}
	}
</style>
