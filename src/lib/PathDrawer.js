import { Group, EventUtil } from './ramen'
import Path from './Path.js'

const THREE_QUARTERS_OF_SECOND = 750
const THIRD_OF_SECOND = 333

export default class PathDrawer extends Group {
	_canvas = null
	_unlisten = null
	_path = null

	constructor(canvas) {
		super()

		this._canvas = canvas

		canvas.dispatch('path_drawer_init', {
			pathDrawer: this,
		})
	}

	_group_added() {
		if (!this._unlisten) {
			this._unlisten = this._canvas.listen(this)
		}
	}

	_group_removed() {
		if (this._unlisten) {
			this._unlisten()
			this._unlisten = null
		}

		super.clear()
		this._resetPath()
	}

	_event_grid_cell_focus(e) {
		const cell = e.detail.cell

		if (this._path && cell) {
			this._path.setEnd(cell)
		}
	}

	_event_left_click() {
		this._newVertex(this._canvas.hovered)
	}

	_event_middle_click() {
		if (!this._path) {
			return
		}

		this._undoNewVertex(this._canvas.hovered)
	}

	_event_right_click() {
		if (!this._path) {
			return
		}

		if (this._path.countVertices() > 2) {
			this._finishPath()
		} else {
			this._resetPath()
		}
	}

	_newVertex(cell) {
		if (!this._path) {
			this._startPath(cell)
			return
		}

		this._path.setEnd(cell)
		this._path.pushVertex()

		this._canvas.dispatch('path_vertex_added', {
			vertexCell: cell,
			path: this._path,
		})
	}

	_undoNewVertex(cell) {
		if (this._path.isSimple()) {
			this._resetPath()
			return
		}

		const point = this._path.popVertex()
		this._path.setEnd(cell)

		this._canvas.dispatch('path_vertex_removed', {
			vertex: point,
			path: this._path,
		})
	}

	_startPath(cell) {
		this._path = new Path(cell)
		super.add(this._path)

		this._canvas.dispatch('path_started', {
			cell,
			path: this._path,
		})
	}

	_finishPath() {
		if (this._path) {
			super.remove(this._path)

			this._path.popVertex()
			this._canvas.dispatch('path_created', {
				path: this._path,
			})

			this._path = null
			this._resetPath()
		}
	}

	_resetPath() {
		if (this._path) {
			super.remove(this._path)
		}

		this._path = null
		this._canvas.dispatch('path_reset')
	}
}
