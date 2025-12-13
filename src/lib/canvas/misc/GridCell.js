import { Two, EventGroup } from '$ramen-grid'

export default class GridCell extends EventGroup {
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

	__when__added_to_group() {
		this.hide()
		super.add(this._haloShape)
	}

	__when__removed_from_group() {
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
		const cell = this.canvas.hovered

		if (this._cell === cell) {
			return
		}

		this._unhover()

		if (cell) {
			this._hover(cell)
		}
	}

	__on__element_focused(e) {
		this.canvas.lastFocused?.updateStyle()
		this.canvas.focused?.updateStyle()
	}

	__on__element_selected(e) {
		this.canvas.lastSelected?.updateStyle()
		this.canvas.selected?.updateStyle()
	}

	_setHaloPosition({ x, y }) {
		this._haloShape.position.x = x
		this._haloShape.position.y = y
	}

	_hover(cell) {
		this._cell = cell

		this._setHaloPosition(cell)
		this.show()

		this.canvas.cursorStyle = 'pointer'
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
