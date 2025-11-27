
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
			selected = null

			canvas.store.set('selected', selected)
			canvas.dispatch('element_select', {
				oldSelect,
				element,
			})
		}
	}
</script>

<div class="element-list">
	{#each elements as [ id, value ] (id)}
		<div
			class="element"
			class:focused={id === focused?.id}
			class:selected={id === selected?.id}
			on:mouseenter={focusListedElement.bind(id)}
			on:mouseleave={unfocusListedElement.bind(id)}
			on:click={selectListedElement.bind(id)}>
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

		background: #DDD;
		cursor: pointer;
	}

	.focused {
		background: orange;
	}

	.selected {
		background: blue;
		color: white;
	}
</style>
