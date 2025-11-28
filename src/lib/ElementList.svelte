<script>
	import { onDestroy } from 'svelte'

	// NOTE: Under development

	let { canvas } = $props()

	let elements = $state(new Map(
		/* {
			id: "",
		} */
	))

	let focused = $state(null)
	let selected = $state(null)

	onDestroy(canvas.listen(
		'diagram_updated',
		diagram_updated,
	))

	function diagram_updated(e) {
		elements = new Map()

		for (const child of e.detail.diagram.children) {
			elements.set(child.id, child)
		}
	}

	function focusListedElement() {
		const oldFocus = canvas.store.get('focused')
		const element = elements.get(this)

		if (oldFocus !== element) {
			focused = element

			canvas.store.set('focused', element)
			canvas.dispatch('element_focus', {
				oldFocus,
				element,
			})
		}
	}

	function unfocusListedElement(e) {
		const oldFocus = canvas.store.get('focused')
		const element = elements.get(this)

		if (oldFocus === element) {
			focused = null

			canvas.store.set('focused', null)
			canvas.dispatch('element_unfocus', {
				oldFocus,
				element,
			})
		}
	}

	function selectListedElement(e) {
		const oldSelect = canvas.store.get('selected')
		const element = elements.get(this)

		if (oldSelect !== element) {
			selected = element

			canvas.store.set('selected', selected)
			canvas.dispatch('element_select', {
				oldSelect,
				element,
			})
		}
	}

	function deleteElement(e) {
		e.stopPropagation()

		const oldFocus = canvas.store.get('focused')
		const oldSelect = canvas.store.get('selected')
		const element = elements.get(this)

		if (focused === element) {
			canvas.dispatch('element_unfocus', {
				oldFocus,
				element,
			})
		}

		if (selected === element) {
			canvas.dispatch('element_unselect', {
				oldSelect,
				element,
			})
		}

		canvas.dispatch('element_delete', { element })
	} 
</script>

<div class="element-list">
	{#each elements as [ id, value ] (id)}
		<div
			class="element"
			class:focused={id === focused?.id}
			class:selected={id === selected?.id}
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
