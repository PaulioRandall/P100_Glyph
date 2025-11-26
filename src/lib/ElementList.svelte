
<script>
	let { canvasStore } = $props()

	let unlistenDiagramupdate = null
	const elements = $state([
		/* {
			id: "",
		} */
	])

	$effect(() => {
		const canvas = $canvasStore

		unlistenDiagramupdate?.call()

		if (!canvas) {
			return
		}

		unlistenDiagramupdate = canvas.listen(
			'diagramupdate',
			updateElementList,
		)
	})

	function updateElementList(e) {
		elements.splice(0)

		for (const child of e.detail.diagram.children) {
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
