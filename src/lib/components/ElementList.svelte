<script>
	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')
</script>

<div class="element-list">
		{#each diagram.elements as element (element.id)}
			<button
				class="element"
				class:focused={diagram.focused === element}
				class:selected={diagram.selected === element}
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
