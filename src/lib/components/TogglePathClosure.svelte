
<script>
	import { onMount } from 'svelte'
	import TextButton from './TextButton.svelte'

	let { canvas } = $props()
	let selected = $state(canvas.selected)

	function updateSelected(element) {
		// Assigning undefined is required because assigning
		// the same element passes Svelte 5's equality check
		// which ignores the asssignment and won't trigger
		// reactivity.  
		selected = undefined
		selected = element
	}

	function setPathClosed(state) {
		canvas.dispatch('request_edit_of_selected_element', {
			closed: state,
		})
	}

	onMount(() => {
		return canvas.on('element_selected', (e) => {
			updateSelected(e.detail.selected)
		})
	})

	onMount(() => {
		return canvas.on('element_updated', (e) => {
			const element = e.detail.element

			if (selected === element) {
				updateSelected(element)
			}
		})
	})
</script>

<TextButton
	disabled={!selected}
	onclick={() => setPathClosed(!selected.closed)}>
	Convert<br/> to
	{#if selected?.closed}
		Line
	{:else}
		Shape
	{/if}
</TextButton>
