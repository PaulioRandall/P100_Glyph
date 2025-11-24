import { Two, Group } from './ramen'

export default class HoveredCell extends Group {
	_canvas = null
	_cell = null
	_haloShape = createHaloShape()

	constructor(canvas) {
		super()

		this._canvas = canvas
		this.hide()
	}

	added() {
		super.add(this._haloShape)
	}

	removed() {
		super.clear()

		this._cell = null
	}

	mousemove(e) {
		this.hover(this._canvas.hovered)
	}

	hover(cell) {
		if (this._cell === cell) {
			return
		}

		this.unhover()

		if (!cell) {
			return
		}

		this._setHaloPosition(cell)
		this.show()

		this._cell = cell
		this._cell.isHovered = true

		this._canvas.cursorStyle = 'pointer'
	}

	unhover() {
		if (this._cell) {
			this.hide()
			this._cell.isHovered = false
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
