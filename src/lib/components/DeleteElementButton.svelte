
<script>
	import IconButton from './IconButton.svelte'

	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')

	function deleteElement() {
		if (diagram.selected) {
			diagram.remove(diagram.selected) 
		}
	}
</script>

<IconButton disabled={!diagram.selected} onclick={deleteElement}>
	Del
</IconButton>
