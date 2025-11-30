
<script>
	let { canvas } = $props()

	const elementStore = canvas.store.get('elementStore')
	const selected = canvas.store.get('selectedStore')

	function deleteElement() {
		if (!$selected) {
			return 
		}

		const element = $selected

		// TODO: Unselect
		// TODO: Create 'Elements extends Map' class that
		//       stores focused and selected state. It also
		//       provides functions for focusing, unfocusing,
		//       selecting, and unselecting elements.

		elementStore.update((elements) => {
			elements.delete(element.id)
			return elements
		})
	}
</script>

<button
	disabled={!$selected}
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
