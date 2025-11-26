
<script>
	// NOTE: Under development

	let { canvasStore } = $props()

	let unlisten = null
	const elements = $state([
		/* {
			id: "",
		} */
	])

	$effect(() => {
		const canvas = $canvasStore

		if (unlisten) {
			unlisten()
		}

		if (!canvas) {
			return
		}

		unlisten = canvas.listen(
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
