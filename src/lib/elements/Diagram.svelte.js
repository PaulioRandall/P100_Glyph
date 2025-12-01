import { writable, get } from 'svelte/store'
import { CanvasGroup, List } from '$ramen'

export default class Diagram extends CanvasGroup {
	_elementsStore = writable(new List())

	_lastFocused = $state(null)
	_focused = $state(null)

	_lastSelected = $state(null)
	_selected = $state(null)

	constructor(canvas) {
		super(canvas)

		const unsub = this._elementsStore.subscribe(
			this._elementsChanged.bind(this)
		)

		this.onFree(unsub)
	}

	get elementsStore() {
		return this._elementsStore
	}

	get lastFocused() {
		return this._lastFocused
	}

	get focused() {
		return this._focused
	}

	get lastSelected() {
		return this._lastSelected
	}

	get selected() {
		return this._selected
	}

	// Adding and removing

	add(element) {
		if (!element) {
			return
		}

		this._elementsStore.update((elements) => {
			elements.push(element)
			return elements
		})
	}

	remove(element) {
		if (!element) {
			return
		}

		this._elementsStore.update((elements) => {
			elements.remove(element)
			return elements
		})
	}

	_elementsChanged(elements) {
		const children = this.children

		for (const child of children) {
			if (!elements.includes(child)) {
				super.remove(child)
			}
		}

		for (const element of elements) {
			if (!children.includes(element)) {
				super.add(element)
			}
		}
	}

	// Focusing and selecting

	focus(element) {
		this._focus(element)
	}

	unfocus() {
		this._focus(null)
	}

	unfocusIfElement(element) {
		if (this._focused === element) {
			this._focus(null)
		}
	}

	select(element) {
		this._select(element)
	}

	unselect() {
		this._select(null)
	}

	unselectIfElement(element) {
		if (this._selected === element) {
			this._select(null)
		}
	}

	_focus(element = null) {
		const elements = get(this.elementsStore)

		if (element && !elements.includes(element)) {
			throw new Error('Element not in diagram')
		}

		if (this._focused && this._focused !== this._selected) {
			this._focused.unhighlight()
		}

		this._lastFocused = this._focused

		if (element && element !== this._selected) {
			element.highlight()
		}

		this._focused = element
	}

	_select(element = null) {
		const elements = get(this.elementsStore)

		if (element && !elements.includes(element)) {
			throw new Error('Element not in diagram')
		}

		if (this._selected) {
			this._selected.unselect()
		}

		this._lastSelected = this._selected

		if (element) {
			element.select()
		}

		this._selected = element
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
