<script>
	import { onDestroy } from 'svelte'
	import { List } from '$ramen'

	// NOTE: Under development

	let { canvas } = $props()

	const lastFocused = canvas.store.get('lastFocusedStore')
	const lastSelected = canvas.store.get('lastSelectedStore')
	const focused = canvas.store.get('focusedStore')
	const selected = canvas.store.get('selectedStore')
	const elements = canvas.store.get('elementStore')

	function setFocused(element) {
		if ($focused && $focused !== $selected) {
			$focused.unhighlight()
		}

		lastFocused.set($focused)

		if (element && element !== $selected) {
			element.highlight()
		}

		focused.set(element)
	}

	function setSelected(element) {
		if ($selected) {
			$selected.unselect()
		}

		lastSelected.set($selected)
		
		if (element) {
			element.select()
		}

		selected.set(element)
	}

	function focusListedElement() {
		const element = $elements.get(this)

		if ($focused !== element) {
			setFocused(element)
		}
	}

	function unfocusListedElement(e) {
		const element = $elements.get(this)

		if ($focused === element) {
			setFocused(null)
		}
	}

	function selectListedElement(e) {
		const element = $elements.get(this)

		if ($selected !== element) {
			setSelected(element)
		}
	}

	function deleteElement(e) {
		e.stopPropagation()

		const element = $elements.get(this)

		if ($focused === element) {
			setFocused(null)
		}

		if ($selected === element) {
			setSelected(null)
		}

		elements.update((map) => {
			map.delete(element.id)
			return map
		})
	} 
</script>

<div class="element-list">
	{#each $elements as [id, element] (id)}
		<div
			class="element"
			class:focused={id === $focused?.id}
			class:selected={id === $selected?.id}
			onmouseenter={focusListedElement.bind(id)}
			onmouseleave={unfocusListedElement.bind(id)}
			onclick={selectListedElement.bind(id)}>
			<span class="element-id">Path</span>
			<button
				class="delete-button" 
				onclick={deleteElement.bind(id)}>
				Delete
			</button>
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
	}

	.focused {
		background: orange;
	}

	.selected {
		background: blue;
		color: white;
	}

	.element-id {
		padding: 0.5rem;
	}

	.delete-button {
		height: 100%;
		padding: 0 1rem;

		cursor: pointer;

		background: #555555;
		color: white;

		border-left: 2px solid black;

		&:hover {
			background: darkred;
		}
	}
</style>
