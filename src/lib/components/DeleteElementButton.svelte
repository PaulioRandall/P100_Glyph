
<script>
	import { onMount } from 'svelte'
	import TextButton from './TextButton.svelte'

	let { canvas } = $props()
	let selected = $state(null)

	function deleteElement() {
		if (selected) {
			canvas.dispatch('delete_selected_elements') 
		}
	}

	onMount(() => {
		return canvas.on('element_selected', (e) => {
			selected = e.detail.selected
		})
	})
</script>

<TextButton disabled={!selected} onclick={deleteElement}>
	Del
</TextButton>
