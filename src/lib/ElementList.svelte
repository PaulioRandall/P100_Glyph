
<script>
	let { canvasStore } = $props()

	const elements = $state([
		/* {
			id: "",
		} */
	])

	$effect(() => {
		const canvas = $canvasStore

		if (!canvas) {
			return
		}

		return canvas.listen('newpath', thing)
	})

	function thing(e) {
		const canvas = $canvasStore

		if (!canvas) {
			return
		}

		const diagram = canvas.store.get('Diagram')

		elements.splice(0)

		for (const child of diagram.children) {
			elements.push({
				id: child.id
			})
		}
	}
</script>

<div class="element-list">
	{#each elements as { id } (id)}
		<div>
			{id}
		</div>
	{/each}
</div>

<style>
	.element-list {
		background: lightskyblue;

		width: 100%;
		height: 100%;
	}
</style>
