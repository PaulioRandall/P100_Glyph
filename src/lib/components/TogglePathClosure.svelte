
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

	function open() {
		if (selected) { 
			selected.open()
			updateSelected(selected)
		}
	}

	function close() {
		if (selected) { 
			selected.close()
			updateSelected(selected)
		}
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

{#if selected?.closed}
	<TextButton disabled={!selected} onclick={open}>
		Convert<br/> to Line
	</TextButton>
{:else}
	<TextButton disabled={!selected} onclick={close}>
		Convert<br/> to Shape
	</TextButton>
{/if}
