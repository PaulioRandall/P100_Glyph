import NoticeGroup from './NoticeGroup.js'

// Extends NoticeGroup by allowing a canvas to be passed
// on construction which is available through a getter.
export default class CanvasGroup extends NoticeGroup {
	_canvas = null

	constructor(canvas, ...children) {
		super(...children)

		this._canvas = canvas
	}

	get canvas() {
		return this._canvas
	}

	get two() {
		return this._canvas.two
	}

	get zui() {
		return this._canvas.zui
	}

	get nav() {
		return this._canvas.nav
	}

	get store() {
		return this._canvas.store
	}

	get cursorStyle() {
		return this._canvas.dom.style.cursor
	}

	set cursorStyle(style) {
		this._canvas.dom.style.cursor = style
	}

	on() {
		return this.canvas.on(...arguments)
	}

	off() {
		this.canvas.off(...arguments)
	}

	dispatch() {
		this.canvas.dispatch(...arguments)
	}
}
