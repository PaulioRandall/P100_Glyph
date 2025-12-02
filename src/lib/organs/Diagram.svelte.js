import { CanvasGroup, List } from '$ramen'

// TODO: toJson()
// TODO: new class 'DiagramFormatter' that accepts JSON
//       and converts to SVG, JPG, PNG, etc

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

		this.canvas.dispatch('diagram_element_added', {
			diagram: this,
			element,
		})
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

		this.canvas.dispatch('diagram_element_removed', {
			diagram: this,
			element,
		})
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

	reselect() {
		const selected = this._selected
		this._selected = undefined
		this._selected = selected
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

		this._focused?.highlight(false)
		this._lastFocused = this._focused
		this._focused = element
		this._focused?.highlight(true)
	}

	_select(element = null) {
		if (element && !this._elements.includes(element)) {
			throw new Error('Element not in diagram')
		}

		this._selected?.select(false)
		this._lastSelected = this._selected
		this._selected = element
		this._selected?.select(true)

		this.canvas.dispatch('diagram_element_selected', {
			lastSelected: this._lastSelected,
			selected: this._selected,
		})

		this._updateMode()
	}

	_updateMode() {
		if (this._selected) {
			this.canvas.editMode()
		} else {
			this.canvas.idleMode()
		}
	}
}
