import Two from 'two.js'
import Group from './Group.js'

export default class HoveredCell extends Group {
	_grid = null
	_cell = null
	_dom = null
	haloShape = createHaloShape()

	constructor(grid, dom) {
		super()
		super.add(this.haloShape)

		this._grid = grid
		this._dom = dom

		this.hide()
	}

	get() {
		return this._cell
	}

	cursorMove(e) {
		const cell = this._grid.cellAt(e.offsetX, e.offsetY)
		this.hover(cell)
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

		// TODO: Make this nicer
		// TODO: SHould this be here?
		this._dom.style.cursor = 'pointer'
	}

	unhover() {
		if (this._cell) {
			this.hide()
			this._cell.isHovered = false
			this._cell = null

			// TODO: Make this nicer
			// TODO: SHould this be here?
			this._dom.style.cursor = 'auto'
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
		this.clear()

		this._grid = null
		this._cell = null
		this._dom = null
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
