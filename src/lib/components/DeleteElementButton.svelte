
<script>
	import { onMount } from 'svelte'
	import IconButton from './IconButton.svelte'

	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')
	let selected = $state(diagram.selected)

	function deleteElement() {
		if (selected) {
			diagram.remove(selected) 
		}
	}

	onMount(() => {
		return canvas.on('element_selected', (e) => {
			selected = e.detail.selected
		})
	})
</script>

<IconButton disabled={!selected} onclick={deleteElement}>
	Del
</IconButton>
