
<script>
	import { onMount } from 'svelte'

	let { canvas } = $props()
	let element = $tate(null)

	onMount(() => {
		const unlistenSelect = canvas.listen('element_select', (e) => {
			element = e.detail.element
		})

		const unlistenUnselect = canvas.listen('element_unselect', (e) => {
			element = null
		})

		return () => {
			unlistenSelect()
			unlistenUnselect()
		}
	}

	function deleteElement() {
		const oldFocus = canvas.store.get('focused')
		const oldSelect = canvas.store.get('selected')

		if (!element) {
			// Should never occur!
			return 
		}

		if (focused === element) {
			canvas.dispatch('element_unfocus', {
				oldFocus,
				element,
			})
		}

		if (selected === element) {
			canvas.dispatch('element_unselect', {
				oldSelect,
				element,
			})
		}

		canvas.dispatch('element_delete', { element })
	}
</script>

<button
	disabled={element}
	class="delete-element-button" 
	onclick={deleteElement}>
	Delete
</button>

<style>
	.delete-element-button {
		height: 40px;
	}
</style>
