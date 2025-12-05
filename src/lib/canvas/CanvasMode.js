import { EventGroup } from '$ramen'

export default class CanvasMode extends EventGroup {
	static MODES = ['Idle', 'Drawing', 'Editing']

	_current = 'Idle'

	get modes() {
		return CanvasMode.MODES
	}

	get current() {
		return this._current
	}

	__group__added() {
		this._current = 'Idle'
	}

	__group__removed() {
		this._current = 'Idle'
	}

	__on__change_mode_request(e) {
		this.switchTo(e.detail.mode)
	}

	_switchTo(mode) {
		if (!CanvasMode.MODES.includes(mode)) {
			throw new Error(`Unknown mode '${mode}'`)
		}

		const previous = this._current
		this._current = mode

		this.canvas.dispatch('canvas_mode_changed', {
			previous,
			current: mode,
		})
	}
}
