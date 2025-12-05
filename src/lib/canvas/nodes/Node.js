import { Two, EventGroup } from '$ramen'

export default class Node extends EventGroup {
	_cell = null
	_shape = null

	constructor(canvas, cell) {
		super(canvas)

		this._cell = cell
	}

	get cell() {
		return this._cell
	}

	__group__added() {
		this._shape = makeShape(this._cell)
		this.add(this._shape)
	}

	__group__removed() {
		this.clear()
		this._shape = null
	}

	__on__grid_cell_hover() {
		if (this._cell === this.canvas.hovered) {
			this._highlight()
		} else {
			this._unhighlight()
		}
	}

	_highlight() {
		this._shape.fill = 'orange'
	}

	_unhighlight() {
		this._shape.fill = 'lightblue'
	}
}

function makeShape(cell) {
	const radius = 16
	const { x, y } = cell

	const circle = new Two.Circle(x, y, radius)

	circle.fill = 'lightblue'
	circle.stroke = 'black'
	circle.linewidth = 4

	return circle
}
