import { Group, EventUtil } from './ramen'
import Diagram from './Diagram.js'
import Path from './Path.js'
import RepeatedAction from './RepeatedAction.js'

const ONE_SECOND = 1000
const THIRD_OF_SECOND = 500

export default class PathDrawer extends Group {
	_canvas = null
	_diagram = null

	_downButton = null
	_path = null

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
		this._diagram = canvas.store.get('Diagram')
	}

	removed() {
		super.clear()
		this._reset()
	}

	mousedown(e) {
		if (this._downButton !== null) {
			return
		}

		this._downButton = e.button

		if (EventUtil.isMiddleButton(e)) {
			this._repeatedUndo.start(ONE_SECOND)
		}
	}

	mousemove() {
		const cell = this._canvas.hovered

		if (this._path && cell) {
			this._path.setEnd(cell)
		}
	}

	mouseup(e) {
		if (!EventUtil.isButton(e, this._downButton)) {
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
			this._finishPath()
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
	}

	_undoNewVertex(cell) {
		if (this._path.isSimple()) {
			this._reset()
			return
		}

		this._path.popVertex()
		this._path.setEnd(cell)
	}

	_startPath(cell) {
		this._path = new Path(cell)
		super.add(this._path)
	}

	_finishPath() {
		if (this._path) {
			super.remove(this._path)

			this._path.popVertex()
			this._diagram.add(this._path)

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
	}
}
