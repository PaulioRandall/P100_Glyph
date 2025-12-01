
<script>
	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')

	function deleteElement() {
		if (!diagram.selected) {
			return 
		}

		// TODO: Unselect
		// TODO: Create 'Elements extends Map' class that
		//       stores focused and selected state. It also
		//       provides functions for focusing, unfocusing,
		//       selecting, and unselecting elements.

		diagram.remove(diagram.selected)
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
