import Cursor from './Cursor.js'

export default class CursorEvents {
	_removeHandlers = null

	constructor(canvas, ...receivers) {
		const downHandler = (e) => {
			const cursor = Cursor.fromEvent(e)

			for (const r of receivers) {
				if (r.cursorDown) {
					r.cursorDown(e, cursor)
				}
			}
		}

		const moveHandler = (e) => {
			const cursor = Cursor.fromEvent(e)

			canvas.cursorMove(e, cursor)

			for (const r of receivers) {
				if (r.cursorMove) {
					r.cursorMove(e, cursor)
				}
			}
		}

		const upHandler = (e) => {
			const cursor = Cursor.fromEvent(e)

			for (const r of receivers) {
				if (r.cursorUp) {
					r.cursorUp(e, cursor)
				}
			}
		}

		canvas.dom.addEventListener('mousedown', downHandler)
		canvas.dom.addEventListener('mousemove', moveHandler)
		canvas.dom.addEventListener('mouseup', upHandler)

		this._removeHandler = () => {
			canvas.dom.removeEventListener('mousedown', downHandler)
			canvas.dom.removeEventListener('mousemove', moveHandler)
			canvas.dom.removeEventListener('mouseup', upHandler)
		}
	}

	free() {
		if (this._removeHandler) {
			this._removeHandler()
		}
	}
}
