import NoticeGroup from './NoticeGroup.js'

// TODO: Add 'on', 'off', 'dispatch' for ease of use.

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
}
