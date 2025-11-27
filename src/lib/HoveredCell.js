import { Two, Group } from './ramen'

export default class HoveredCell extends Group {
	_canvas = null
	_unlisten = null

	_cell = null
	_haloShape = createHaloShape()

	constructor(canvas) {
		super()

		this._canvas = canvas

		canvas.dispatch('hovering_cell_init', {
			hoveringCell: this,
		})
	}

	show() {
		// super.visible
		this.visible = true
	}

	hide() {
		// super.visible
		this.visible = false
	}

	_group_added() {
		this.hide()
		super.add(this._haloShape)

		if (!this._unlisten) {
			this._unlisten = this._canvas.listen(this)
		}
	}

	_group_removed() {
		if (this._unlisten) {
			this._unlisten()
			this._unlisten = null
		}

		this._cell = null

		super.clear()
	}

	_event_grid_cell_focus(e) {
		const cell = e.detail.cell

		if (this._cell === cell) {
			return
		}

		this._unhover()

		if (!cell) {
			return
		}

		this._setHaloPosition(cell)
		this.show()

		this._cell = cell

		this._canvas.cursorStyle = 'pointer'
	}

	_setHaloPosition({ x, y }) {
		this._haloShape.position.x = x
		this._haloShape.position.y = y
	}

	_unhover() {
		if (this._cell) {
			this.hide()
			this._cell = null

			this._canvas.cursorStyle = 'auto'
		}
	}
}

function createHaloShape() {
	const radius = 16
	const shape = new Two.Circle(0, 0, radius)

	shape.fill = 'none'
	shape.stroke = 'blue'
	shape.linewidth = 10
	shape.opacity = 0.5

	return shape
}
