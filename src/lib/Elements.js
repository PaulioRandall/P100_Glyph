import { writable } from 'svelte/store'

// TODO: Combine with 'Diagram' class.
//       Map could be a member 'elementStore' with getter.
//       Add and remove could do a 'store.update'.
export default class Elements extends Map {
	_canvas = null

	_lastFocusedStore = writable(null)
	_focusedStore = writable(null)

	_lastSelectedStore = writable(null)
	_selectedStore = writable(null)

	constructor(canvas) {
		this._canvas = canvas
	}

	get lastFocusedStore() {
		return this._lastFocusedStore
	}

	get focusedStore() {
		return this._focusedStore
	}

	get lastSelectedStore() {
		return this._lastSelectedStore
	}

	get selectedStore() {
		return this._selectedStore
	}

	add(element) {
		this.set(element.id, element)
	}

	remove(element) {
		this.delete(element.id)
	}

	focus(element) {
		if ($focused && $focused !== $selected) {
			$focused.unhighlight()
		}

		lastFocused.set($focused)

		if (element && element !== $selected) {
			element.highlight()
		}

		focused.set(element)
	}

	unfocus() {
		// TODO
	}

	unfocusIfElement(element) {
		// TODO
	}

	select(element) {
		// TODO
	}

	unselect() {
		// TODO
	}

	unselectIfElement(element) {
		// TODO
	}

	_focus(element = null) {
		//this._canvas.store.get('lastFocused')
		//this._canvas.store.get('focused')
		// TODO
	}

	_select(element = null) {
		// TODO
	}
}
