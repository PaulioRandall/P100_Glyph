import { EventGroup, ClickTracker } from '$ramen'
import { Path } from '../elements'

export default class PathDrawer extends EventGroup {
	_path = null
	_clickTracker = new ClickTracker()

	_group_removed() {
		super._group_removed()
		this._resetPath()
	}

	_event_grid_cell_hover(e) {
		const cell = e.detail.cell
		const path = this._path

		if (path && cell) {
			path.updateLastPoint(cell)
		}
	}

	_event_left_click() {
		const clickCount = this._clickTracker.click()
		const doubleClick = clickCount >= 2

		if (this._path) {
			if (doubleClick && this._isHoveringLastPoint()) {
				this._finishPath()
			} else {
				this._addPoint(this.canvas.hovered)
			}

			return
		}

		if (doubleClick) {
			this._clickTracker.reset()
			this._startPath(this.canvas.hovered)
			return
		}
	}

	_event_right_click() {
		if (this._path) {
			this._removeLastPoint(this.canvas.hovered)
		}
	}

	_isHoveringLastPoint(cell) {
		if (this._path) {
			return this.canvas.hovered === this._path.getLastShapePoint()
		}
		return false
	}

	_startPath(cell) {
		const path = new Path(this.canvas, cell)
		super.add(path)

		this._path = path

		this.canvas.drawMode()
		this.canvas.dispatch('path_started', { cell, path })
	}

	_addPoint(cell) {
		const path = this._path

		if (path.getLastShapePoint() === cell) {
			return
		}

		path.updateLastPoint(cell)
		path.lineTo(cell)

		this.canvas.dispatch('path_point_added', { cell, path })
	}

	_removeLastPoint(cell) {
		const path = this._path

		if (!path.isMultiPoint()) {
			this._resetPath()
			return
		}

		path.removeLastPoint()
		path.updateLastPoint(cell)

		this.canvas.dispatch('path_point_removed', { path })
	}

	_finishOrResetPath() {
		const path = this._path

		if (!path) {
			return
		}

		if (path.isMultiPoint()) {
			this._finishPath()
		} else {
			this._resetPath()
		}
	}

	_finishPath() {
		const path = this._path

		if (path) {
			super.remove(path)
			this._resetPath()
			this.canvas.idleMode()

			path.removeLastPoint()
			path.tidy()

			this.canvas.dispatch('path_finished', { path })
			this.canvas.addElement(path)
		}
	}

	_resetPath() {
		super.clear()

		this._path = null
		this._clickTracker.reset()

		this.canvas.dispatch('path_reset')
	}
}
