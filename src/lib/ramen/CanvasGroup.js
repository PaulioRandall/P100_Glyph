import Group from './Group.js'

export default class CanvasGroup extends Group {
	_canvas = null
	_offEventor = null

	constructor(canvas, ...children) {
		super(...children)

		this._canvas = canvas
	}

	get canvas() {
		return this._canvas
	}

	group_added() {
		this._offEventor = this.canvas.onEventor(this)
	}

	group_removed() {
		this._offEventor()
	}
}
