import { EventGroup } from '$ramen-grid'

export default class CanvasMode extends EventGroup {
	static MODES = ['Idle', 'Drawing', 'Editing']

	_current = 'Idle'

	get modes() {
		return CanvasMode.MODES
	}

	get current() {
		return this._current
	}

	__when__added_to_group() {
		this._current = 'Idle'
	}

	__when__removed_from_group() {
		this._current = 'Idle'
	}

	__on__change_mode(e) {
		this._switchTo(e.detail.mode)
	}

	_switchTo(mode) {
		if (!CanvasMode.MODES.includes(mode)) {
			throw new Error(`Unknown mode '${mode}'`)
		}

		const previous = this._current
		this._current = mode

		this.dispatch('canvas_mode_changed', {
			previous,
			current: mode,
		})
	}
}
