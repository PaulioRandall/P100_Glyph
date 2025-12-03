import { CanvasGroup } from '$ramen'

export default class CanvasMode extends CanvasGroup {
	static MODES = ['Idle', 'Drawing', 'Editing']

	_current = 'Idle'

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

		this.canvas.dispatch('canvas_mode_changed', {
			previous,
			current: mode,
		})
	}

	__group__added() {
		this._current = 'Idle'
	}

	__group__removed() {
		this._current = 'Idle'
	}
}
