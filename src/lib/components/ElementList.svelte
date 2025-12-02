<script>
	import { onMount } from 'svelte'

	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')
	
	let elements = $state(diagram.elements)
	let focused = $state(diagram.focused)
	let selected = $state(diagram.selected)

	onMount(() => {
		return canvas.on('elements_changed', (e) => {
			elements = e.detail.elements
		})
	})

	onMount(() => {
	return canvas.on('element_focused', (e) => {
		focused = e.detail.focused
	})
	})

	onMount(() => {
	return canvas.on('element_selected', (e) => {
		selected = e.detail.selected
	})
	})
</script>

<div class="element-list">
		{#each elements as element (element.id)}
			<button
				class="element"
				class:focused={focused === element}
				class:selected={selected === element}
				onmouseenter={() => diagram.focus(element)}
				onmouseleave={() => diagram.unfocus(element)}
				onclick={() => diagram.select(element)}>
				Path
			</button>
		{/each}
</div>

<style>
	.element-list {
		height: 100%;
	}

	.element {
		border: 1px solid black;

		background: #DDD;
		cursor: pointer;

		display: flex;
		justify-content: space-between;
		align-items: center;

		height: 40px;
		width: 100%;

		padding: 0.5rem;
	}

	.focused {
		background: orange;
	}

	.selected {
		background: blue;
		color: white;
	}
</style>
