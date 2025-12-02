
<script>
	import { onMount } from 'svelte'
	import IconButton from './IconButton.svelte'

	let { canvas } = $props()
	let selected = $state(null)

	function deleteElement() {
		if (selected) {
			canvas.removeElement(selected) 
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
