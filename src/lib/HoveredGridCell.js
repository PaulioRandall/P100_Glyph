import Two from 'two.js'
import { Group } from './ramen'

export default class HoveredGridCell extends Group {
	_grid = null
	cell = null
	haloShape = createHaloShape()

	constructor(grid) {
		super()
		super.add(this.haloShape)

		this._grid = grid
		this.hide()
	}

	isSelected() {
		return !!this.cell
	}

	hover(cell) {
		this.unhover()

		if (!cell) {
			return
		}

		this._setHaloPosition(cell)
		this.show()

		this.cell = cell
		this.cell.isHovered = true

		// TODO: Make this nicer
		// TODO: SHould this be here?
		this._grid.canvas.dom.style.cursor = 'pointer'
	}

	unhover() {
		if (this.cell) {
			this.hide()
			this.cell.isHovered = false
			this.cell = null

			// TODO: Make this nicer
			// TODO: SHould this be here?
			this._grid.canvas.dom.style.cursor = 'auto'
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
		this.haloShape.position.x = x
		this.haloShape.position.y = y
	}
}

function createHaloShape() {
	const radius = 16
	const shape = new Two.Circle(0, 0, radius)

	shape.fill = 'none'
	shape.stroke = 'slategrey'
	shape.linewidth = 12
	shape.opacity = 0.5

	return shape
}
