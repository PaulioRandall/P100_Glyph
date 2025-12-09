
<script>
	import { onMount } from 'svelte'
	import TextButton from './TextButton.svelte'

	let { canvas } = $props()
	let selected = $state(null)

	function updateSelected(element) {
		// Assigning undefined is required because assigning
		// the same element passes Svelte 5's equality check
		// which ignores the asssignment and won't trigger
		// reactivity.  
		selected = undefined
		selected = element
	}

	function toggleSelectedCloseState() {
		canvas.dispatch('modify_selected_elements', {
			closed: !selected.isClosed,
		})
	}

	onMount(() => {
		return canvas.on('element_selected', (e) => {
			updateSelected(e.detail.selected)
		})
	})

	onMount(() => {
		return canvas.on('elements_updated', (e) => {
			const elements = e.detail.elements

			if (elements.includes(selected)) {
				updateSelected(selected)
			}
		})
	})
</script>

<TextButton
	disabled={!selected}
	onclick={toggleSelectedCloseState}>
	Convert<br/> to
	{#if selected?.isClosed}
		Line
	{:else}
		Shape
	{/if}
</TextButton>
