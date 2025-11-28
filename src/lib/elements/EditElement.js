import { CanvasGroup } from '$ramen'

// TODO: This functionality probably shouldn't be here but
//       no idea where it should go yet.

export default class EditElement extends CanvasGroup {
	_focused = null
	_selected = null

	constructor(canvas) {
		super(canvas)
	}

	_event_element_focus(e) {
		const element = e.detail.element

		if (this._selected === element) {
			return
		}

		if (this._focused === element) {
			return
		}

		this._highlight(element)
	}

	_event_element_unfocus(e) {
		const element = e.detail.element

		if (this._selected !== element) {
			element.unhighlight()
		}

		if (this._focused === element) {
			this._focused = null
		}
	}

	_event_element_select(e) {
		const element = e.detail.element

		if (this._selected === element) {
			return
		}

		this._select(element)
	}

	_event_element_unselect() {
		this._unselect()
	}

	_highlight(element) {
		this._unhighlight()
		this._focused = element
		this._focused.highlight()
	}

	_unhighlight() {
		if (this._focused) {
			this._focused.unhighlight()
			this._focused = null
		}
	}

	_select(element) {
		this._unselect()
		this._selected = element
		this._selected.select()
	}

	_unselect() {
		if (this._selected) {
			this._selected.unselect()
			this._selected = null
		}
	}
}
