import { EventGroup, List } from '$ramen-grid'

// TODO: toJson()
// TODO: new class 'DiagramFormatter' that accepts JSON
//       and converts to SVG, JPG, PNG, etc

export default class Diagram extends EventGroup {
	_elements = []

	_lastFocused = null
	_focused = null

	_lastSelected = null
	_selected = null

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

	__on__delete_selected_elements() {
		this.canvas.removeElement(this._selected)
	}

	addElement(element) {
		if (!element) {
			return
		}

		this._elements.push(element)
		super.add(element)

		this.dispatch('elements_changed', {
			elements: this._elements,
			added: element,
			removed: null,
		})
	}

	removeElement(element) {
		if (!element) {
			return
		}

		this.unfocusIfElement(element)
		this.unselectIfElement(element)

		List.remove(this._elements, element)
		super.remove(element)

		this.dispatch('elements_changed', {
			elements: this._elements,
			added: null,
			removed: element,
		})
	}

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

		this._lastFocused = this._focused
		this._focused = element

		this.dispatch('element_focused', {
			lastfocused: this._lastfocused,
			focused: this._focused,
			lastSelected: this._lastSelected,
			selected: this._selected,
		})
	}

	_select(element = null) {
		if (element && !this._elements.includes(element)) {
			throw new Error('Element not in diagram')
		}

		this._lastSelected = this._selected
		this._selected = element

		this.dispatch('element_selected', {
			lastfocused: this._lastfocused,
			focused: this._focused,
			lastSelected: this._lastSelected,
			selected: this._selected,
		})

		this.dispatch('canvas_mode_request', {
			mode: this._selected ? 'Editing' : 'Idle',
		})
	}
}
