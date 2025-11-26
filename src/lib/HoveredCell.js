import { Two, Group, EventUtil } from './ramen'

export default class HoveredCell extends Group {
	_canvas = null
	_unlisten = null

	_cell = null
	_haloShape = createHaloShape()

	constructor(canvas) {
		super()

		this._canvas = canvas

		this._unlisten = this._canvas.listen('hoveringcell', this._hover, this)

		this.hide()
	}

	added() {
		super.add(this._haloShape)
	}

	removed() {
		super.clear()

		this._cell = null
	}

	_hover(e) {
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

	_unhover() {
		if (this._cell) {
			this.hide()
			this._cell = null

			this._canvas.cursorStyle = 'auto'
		}
	}

	show() {
		// super.visible
		this.visible = true
	}

	hide() {
		// super.visible
		this.visible = false
	}

	free() {
		this._unlisten?.call(null)
	}

	_setHaloPosition({ x, y }) {
		this._haloShape.position.x = x
		this._haloShape.position.y = y
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
