import { Two, CanvasGroup } from '$ramen'

export default class ElementNode extends CanvasGroup {
	_cell = null
	_shape = null

	constructor(canvas, cell) {
		super(canvas)

		this._cell = cell
	}

	get cell() {
		return this._cell
	}

	enableEditing() {
		this._shape.fill = 'orange'
	}

	disableEditing() {
		this._shape.fill = 'lightblue'
	}

	__group__added() {
		this._shape = makeShape(this._cell)
		this.add(this._shape)
	}

	__group__removed() {
		this.clear()
		this._shape = null
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
