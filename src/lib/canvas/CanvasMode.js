import { CanvasGroup } from '$ramen'

export default class CanvasMode {
	static MODES = ['Idle', 'Drawing', 'Editing']

	_canvas = null
	_current = 'Idle'

	constructor(canvas) {
		this._canvas = canvas
	}

	get modes() {
		return CanvasMode.MODES
	}

	get current() {
		return this._current
	}

	switchTo(mode) {
		if (!CanvasMode.MODES.includes(mode)) {
			throw new Error(`Unknown mode '${mode}'`)
		}

		const previous = this._current
		this._current = mode

		this._canvas.dispatch('canvas_mode_changed', {
			previous,
			current: mode,
		})
	}
}
