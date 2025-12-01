import Group from './Group.js'

export default class CanvasGroup extends Group {
	_canvas = null
	_unlisten = null

	constructor(canvas, ...children) {
		super(...children)

		this._canvas = canvas
	}

	get canvas() {
		return this._canvas
	}

	group_added() {
		this._unlisten = this.canvas.listen(this)
	}

	group_removed() {
		this._unlisten()
	}
}
