import { Two, EventGroup } from '$ramen'

export default class GridCellHighlighter extends EventGroup {
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

	__group__added() {
		this.hide()
		super.add(this._haloShape)
	}

	__group__removed() {
		super.clear()
		this._cell = null
	}

	__on__pointerenter() {
		this.show()
	}

	__on__pointerleave() {
		this.hide()
	}

	__on__grid_cell_hover(e) {
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
	shape.stroke = 'lightgrey'
	shape.linewidth = 10
	shape.opacity = 0.5

	return shape
}
