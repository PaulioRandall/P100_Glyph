
<script>
	import { onMount } from 'svelte'
	import TextButton from './TextButton.svelte'

	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')

	let selected = $state(null)
	let closed = $state(null)
	updateSelected(diagram.selected)

	function updateSelected(element) {
		selected = element
		closed = element ? element.closed : null
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
		return canvas.on('diagram_element_selected', (e) => {
			updateSelected(e.detail.selected)
		})
	})
</script>

{#if closed}
	<TextButton disabled={!selected} onclick={open}>
		Convert<br/> to Line
	</TextButton>
{:else}
	<TextButton disabled={!selected} onclick={close}>
		Convert<br/> to Shape
	</TextButton>
{/if}
