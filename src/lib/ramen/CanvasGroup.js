import Group from './Group.js'

export default class CanvasGroup extends Group {
	_canvas = null
	_unlistener = null

	constructor(canvas, ...children) {
		super(...children)

		this._canvas = canvas
		this._unlistener = canvas.listen(this)
	}

	get canvas() {
		return this._canvas
	}

	_unlisten() {
		if (this._unlistener) {
			this._unlistener()
			this._unlistener = null
		}
	}
}
