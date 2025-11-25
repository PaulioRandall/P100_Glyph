import { Group, EventUtil } from './ramen'
import Diagram from './Diagram.js'
import Path from './Path.js'
import RepeatedAction from './RepeatedAction.js'

const ONE_SECOND = 1000
const THIRD_OF_SECOND = 500

// NEXT: Allow single SVG path of simple lines to be drawn
export default class PathDrawer extends Group {
	_canvas = null

	// TODO: Move this to top level (Glyph.svelte).
	//       Also need to send completed paths to the
	//       Diagram somehow (use canvas.store.get).
	_diagram = new Diagram()

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
	}

	added() {
		super.add(this._diagram)
	}

	removed() {
		super.clear()
		this._reset()
	}

	get diagram() {
		return this._diagram
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
		this.diagram.add(this._path)
	}

	_finishPath() {
		if (this._path) {
			this._path.popVertex()
			this._path = null
			this._reset()
		}
	}

	_reset() {
		if (this._path) {
			this.diagram.remove(this._path)
		}

		this._downTime = null
		this._downButton = null
		this._path = null
	}
}
