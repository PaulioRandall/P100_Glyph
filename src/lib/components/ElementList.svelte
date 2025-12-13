<script>
	import { onMount } from 'svelte'

	let { canvas } = $props()
	
	let elements = $state(canvas.elements)
	let focused = $state(canvas.focused)
	let selected = $state(canvas.selected)

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
				onmouseenter={() => canvas.focus(element)}
				onmouseleave={() => canvas.unfocus(element)}
				onclick={() => canvas.select(element)}>
				Path
			</button>
		{/each}
</div>

<style>
	.element-list {
				position: absolute;

		height: 100%;
		border-radius: 8px;

		width: var(--element-pane-width);
		height: calc(100% - var(--gap) - var(--unit-height) - var(--gap) - var(--gap));

		bottom: var(--gap);
		right: var(--gap);

		background: rgba(0, 40, 120, 0.6);

		pointer-events: none;

		& :global(*) {
			pointer-events: auto;
		}
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
