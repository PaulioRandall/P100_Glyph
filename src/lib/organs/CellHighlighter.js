import { Two, CanvasGroup } from '$ramen'

export default class CellHighlighter extends CanvasGroup {
	_cell = null
	_haloShape = createHaloShape()

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
		super._group_added()
	}

	_group_removed() {
		this._cell = null
		super.clear()
		super._group_removed()
	}

	_event_pointerenter() {
		this.show()
	}

	_event_pointerleave() {
		this.hide()
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

		this.canvas.cursorStyle = 'pointer'
	}

	_setHaloPosition({ x, y }) {
		this._haloShape.position.x = x
		this._haloShape.position.y = y
	}

	_unhover() {
		if (this._cell) {
			this.hide()
			this._cell = null

			this.canvas.cursorStyle = 'auto'
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
