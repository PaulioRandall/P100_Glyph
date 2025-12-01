<script>
	let { canvas } = $props()

	const diagram = canvas.store.get('diagram')
	const elementsStore = diagram.elementsStore

	function focusElement() {
		diagram.focus(this)
	}

	function unfocusElement() {
		diagram.unfocusIfElement(this)
	}

	function selectElement() {
		diagram.select(this)
	}
</script>

<div class="element-list">
		{#each $elementsStore as element (element.id)}
			<div
				class="element"
				class:focused={diagram.focused === element}
				class:selected={diagram.selected === element}
				onmouseenter={focusElement.bind(element)}
				onmouseleave={unfocusElement.bind(element)}
				onclick={selectElement.bind(element)}>
				Path
			</div>
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
