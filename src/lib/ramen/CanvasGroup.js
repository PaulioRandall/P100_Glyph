import Group from './Group.js'
import List from './List.js'

export default class CanvasGroup extends Group {
	_canvas = null
	_onFree = null
	_unlisten = null

	constructor(canvas, ...children) {
		super(...children)

		this._canvas = canvas
		this._onFree = new List()
	}

	get canvas() {
		return this._canvas
	}

	onFree(func) {
		if (!func || typeof func !== 'function') {
			throw new Error(`onFree(function) only accepts a non-null function`)
		}

		this._onFree.push(func)
	}

	free() {
		for (const func of this._onFree) {
			func()
		}
		super.free()
	}

	_group_added() {
		this._unlisten = this.canvas.listen(this)
	}

	_group_removed() {
		this._unlisten()
	}
}
