
<script>
	import { onMount } from 'svelte'
	import IconButton from './IconButton.svelte'

	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')
	let selected = $state(diagram.selected)

	onMount(() => {
		return canvas.on('diagram_element_selected', (e) => {
			selected = e.detail.selected
		})
	})

	function deleteElement() {
		if (selected) {
			diagram.remove(selected) 
		}
	}
</script>

<IconButton disabled={!selected} onclick={deleteElement}>
	Del
</IconButton>
