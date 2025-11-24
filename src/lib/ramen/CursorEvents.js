export default class CursorEvents {
	_removeHandlers = null

	constructor(canvas, ...receivers) {
		const downHandler = (e) => {
			for (const r of receivers) {
				if (r.mousedown) {
					r.mousedown(e)
				}
			}
		}

		const moveHandler = (e) => {
			canvas.mousemove(e)

			for (const r of receivers) {
				if (r.mousemove) {
					r.mousemove(e)
				}
			}
		}

		const upHandler = (e) => {
			for (const r of receivers) {
				if (r.mouseup) {
					r.mouseup(e)
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
			this._removeHandler = null
		}
	}
}
