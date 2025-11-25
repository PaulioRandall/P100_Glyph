// NEXT: Remove this class and let entities handle their
//       subscriptions internally.

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

		canvas.listen('mousedown', downHandler)
		canvas.listen('mousemove', moveHandler)
		canvas.listen('mouseup', upHandler)

		this._removeHandler = () => {
			canvas.unlisten('mousedown', downHandler)
			canvas.unlisten('mousemove', moveHandler)
			canvas.unlisten('mouseup', upHandler)
		}
	}

	free() {
		if (this._removeHandler) {
			this._removeHandler()
			this._removeHandler = null
		}
	}
}
