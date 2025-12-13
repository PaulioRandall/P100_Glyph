import { EventGroup, ClickTracker } from '$ramen-grid'
import PathBeingDrawn from './PathBeingDrawn.js'

export default class PathDrawer extends EventGroup {
	_pathBeingDrawn = null
	_clickTracker = new ClickTracker()

	__when__removed_from_group() {
		this._reset()
	}

	__on__grid_cell_hover() {
		this._pathBeingDrawn?.moveCursorTo(this.canvas.hovered)
	}

	__on__left_click() {
		const hoveredCell = this.canvas.hovered
		const drawnPath = this._pathBeingDrawn
		const clickCount = this._clickTracker.click()
		const doubleClick = clickCount >= 2

		if (!drawnPath && doubleClick) {
			this._clickTracker.reset()
			this._startPath(hoveredCell)
			return
		}

		if (drawnPath && !doubleClick) {
			drawnPath.pushNode(hoveredCell)
			return
		}

		if (drawnPath && doubleClick) {
			this._finishPath(hoveredCell)
			return
		}
	}

	__on__right_click() {
		if (this._pathBeingDrawn) {
			this._undo()
		}
	}

	_startPath(cell) {
		this._pathBeingDrawn = new PathBeingDrawn(this.canvas, cell)
		this.add(this._pathBeingDrawn)

		this.canvas.unselect()
		this.dispatch('change_mode', {
			mode: 'Drawing',
		})
	}

	_undo() {
		const drawnPath = this._pathBeingDrawn

		drawnPath.popNode()
		if (!drawnPath.isValid()) {
			this._reset()
		}
	}

	_finishPath(cell) {
		const drawnPath = this._pathBeingDrawn
		const finishedPath = drawnPath.get()

		if (!finishedPath) {
			return
		}

		this.canvas.addElement(finishedPath)
		this.canvas.select(finishedPath)
		this._reset()
	}

	_reset() {
		super.clear()

		this._pathBeingDrawn = null
		this._clickTracker.reset()

		this.dispatch('change_mode', {
			mode: 'Idle',
		})
		this.dispatch('path_drawer_reset')
	}
}
