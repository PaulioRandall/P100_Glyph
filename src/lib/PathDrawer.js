import { Group, EventUtil } from './ramen'
import Path from './Path.js'
import RepeatedAction from './RepeatedAction.js'

const THREE_QUARTERS_OF_SECOND = 750
const THIRD_OF_SECOND = 333

export default class PathDrawer extends Group {
	_canvas = null
	_eventor = null
	_path = null

	_downButton = null

	_repeatedUndo = new RepeatedAction(() => {
		if (!this._path) {
			return false
		}

		this._undoNewVertex(this._canvas.hovered)
		return !!this._path
	}, THIRD_OF_SECOND)

	constructor(canvas) {
		super()

		this._canvas = canvas

		this._eventor = canvas.eventor(this)
		this._eventor.listen('mousedown', this._mousedown)
		this._eventor.listen('mousemove', this._mousemove)
		this._eventor.listen('mouseup', this._mouseup)
	}

	removed() {
		super.clear()
		this._reset()
	}

	_mousedown(e) {
		if (this._downButton !== null) {
			return
		}

		this._downButton = e.button

		if (EventUtil.isMiddleButton(e)) {
			this._repeatedUndo.start(THREE_QUARTERS_OF_SECOND)
		}
	}

	_mousemove() {
		const cell = this._canvas.hovered

		if (this._path && cell) {
			this._path.setEnd(cell)
		}
	}

	_mouseup(e) {
		if (!e.button === this._downButton) {
			return
		}

		this._downButton = null

		if (EventUtil.isLeftButton(e)) {
			this._newVertex(this._canvas.hovered)
			return
		}

		if (!this._path) {
			return
		}

		if (EventUtil.isMiddleButton(e)) {
			if (this._repeatedUndo.stop() === 0) {
				this._undoNewVertex(this._canvas.hovered)
			}
			return
		}

		if (EventUtil.isRightButton(e)) {
			if (this._path.countVertices() > 2) {
				this._finishPath()
			} else {
				this._reset()
			}
			return
		}
	}

	_newVertex(cell) {
		if (!this._path) {
			this._startPath(cell)
			return
		}

		this._path.setEnd(cell)
		this._path.pushVertex()

		this._canvas.dispatch('newpathvertex', {
			vertexCell: cell,
			path: this._path,
		})
	}

	_undoNewVertex(cell) {
		if (this._path.isSimple()) {
			this._reset()
			return
		}

		const point = this._path.popVertex()
		this._path.setEnd(cell)
		this._canvas.dispatch('undopathvertex', {
			vertex: point,
			path: this._path,
		})
	}

	_startPath(cell) {
		this._path = new Path(cell)
		super.add(this._path)
		this._canvas.dispatch('startpath', {
			cell,
			path: this._path,
		})
	}

	_finishPath() {
		if (this._path) {
			super.remove(this._path)

			this._path.popVertex()

			this._canvas.dispatch('newpath', {
				path: this._path,
			})

			this._path = null
			this._reset()
		}
	}

	_reset() {
		if (this._path) {
			super.remove(this._path)
		}

		this._downTime = null
		this._downButton = null
		this._path = null

		this._canvas.dispatch('resetpath')
	}

	free() {
		this._eventor.free()
	}
}
