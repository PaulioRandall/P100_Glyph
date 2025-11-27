
<script>
	import { onMount, onDestroy } from 'svelte'
	// NOTE: Under development

	let { canvas } = $props()

	const elements = $state([
		/* {
			id: "",
		} */
	])

	onDestroy(canvas.listen(
		'diagram_updated',
		diagram_updated,
	))

	function diagram_updated(e) {
		elements.splice(0)

		for (const child of e.detail.diagram.children) {
			elements.push({
				id: child.id,
				curved: child.curved,
			})
		}
	}
</script>

<div class="element-list">
	{#each elements as { id, curved } (id)}
		<div class="element">
			<span>ID: {id}</span>
		</div>
	{/each}
</div>

<style>
	.element-list {
		background: lightskyblue;

		width: 100%;
		height: 100%;
	}

	.element {
		padding: 0.5rem;
		border: 1px solid black;
	}
</style>
