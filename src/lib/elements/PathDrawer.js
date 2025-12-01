import { CanvasGroup } from '$ramen'
import Path from './Path.js'

export default class PathDrawer extends CanvasGroup {
	_path = null

	_group_removed() {
		super.clear()
		this._resetPath()
	}

	_event_grid_cell_focus(e) {
		const cell = e.detail.cell
		const path = this._path

		if (path && cell) {
			path.setEnd(cell)
		}
	}

	_event_left_click() {
		this._newVertex(this.canvas.hovered)
	}

	_event_middle_click() {
		if (!this._path) {
			return
		}

		this._undoNewVertex(this.canvas.hovered)
	}

	_event_right_click() {
		const path = this._path

		if (!path) {
			return
		}

		if (path.countVertices() > 2) {
			this._finishPath()
		} else {
			this._resetPath()
		}
	}

	_newVertex(cell) {
		const path = this._path

		if (!path) {
			this._startPath(cell)
			return
		}

		path.setEnd(cell)
		path.pushVertex()

		this.canvas.dispatch('path_vertex_added', { cell, path })
	}

	_undoNewVertex(cell) {
		const path = this._path

		if (path.isSimple()) {
			this._resetPath()
			return
		}

		const vertex = path.popVertex()
		path.setEnd(cell)

		this.canvas.dispatch('path_vertex_removed', { vertex, path })
	}

	_startPath(cell) {
		const path = new Path(cell)
		super.add(path)

		this._path = path
		this.canvas.dispatch('path_started', { cell, path })
	}

	_finishPath() {
		const path = this._path

		if (path) {
			super.remove(path)

			path.popVertex()

			this.canvas.store.get('diagram').add(path)
			this.canvas.dispatch('path_finished', { path })

			this._path = null
			this._resetPath()
		}
	}

	_resetPath() {
		const path = this._path

		if (path) {
			super.remove(path)
		}

		this._path = null
		this.canvas.dispatch('path_reset')
	}
}
