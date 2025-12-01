import { CanvasGroup, List } from '$ramen'

export default class Diagram extends CanvasGroup {
	_elements = $state([])

	_lastFocused = $state(null)
	_focused = $state(null)

	_lastSelected = $state(null)
	_selected = $state(null)

	get elements() {
		return this._elements
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

		this._elements.push(element)
		super.add(element)

		this.select(element)
	}

	remove(element) {
		if (!element) {
			return
		}

		this.unfocusIfElement(element)
		this.unselectIfElement(element)

		List.remove(this._elements, element)
		super.remove(element)
	}

	// Focus and selection

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
		if (element && !this._elements.includes(element)) {
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
		if (element && !this._elements.includes(element)) {
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
