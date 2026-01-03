import Cheddar from '$cheddar'
import PathDrawer from './PathDrawer.js'

// TODO: Add stack of modes. Allow temp switching to new
//       mode, putting old mode on the stack (their
//       elemental should remain in the group).
// TODO: Then add MODE_PAN.

export default class ModeManager extends Cheddar.Group {
	static MODE_IDLE = 'MODE_IDLE'
	static MODE_DRAW_PATH = 'MODE_DRAW_PATH'

	_mode = ModeManager.MODE_IDLE
	_elemental = null

	get mode() {
		return this._mode
	}

	get elemental() {
		return this._elemental
	}

	__onsvg__switchmode(e) {
		this.switchToMode(e.detail.mode)
	}

	switchToMode(mode) {
		switch (mode) {
			case ModeManager.MODE_IDLE:
				this.switchToIdleMode()
				return

			case ModeManager.MODE_DRAW_PATH:
				this.switchToDrawMode()
				return

			default:
				throw new Error(`Unknown mode '${mode}'`)
		}
	}

	switchToIdleMode() {
		this._switchToMode(ModeManager.MODE_IDLE)
	}

	switchToDrawMode() {
		this._switchToMode(ModeManager.MODE_DRAW_PATH, new PathDrawer())
	}

	_switchToMode(newMode, newElem = null) {
		const currMode = this._mode
		const elem = this._elemental

		if (currMode === newMode) {
			return
		}

		if (elem) {
			this.doMuted(() => this.remove(elem))
		}

		this._setMode(newMode, newElem)
		if (newElem) {
			this.add(newElem)
		}
	}

	_setMode(mode, elemental = null) {
		this._mode = mode
		this._elemental = elemental
	}
}
