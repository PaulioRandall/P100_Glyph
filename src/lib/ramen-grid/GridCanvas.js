import {
	Two, //
	Canvas, //
	NoticeGroup, //
} from '$ramen'

import GridCell from './GridCell.js'

export default class GridCanvas extends Canvas {
	_gridSize = 9
	_background = new NoticeGroup()
	_cells = new NoticeGroup()
	_hovered = null
	_onmousemove = this._cursorMovement.bind(this)

	constructor(container, options = {}) {
		super(container, options)

		this.dom.style.background = '#222222'
		this.zui.addLimits(0.3, 4)

		this.add(this._background)
		this.add(this._cells)

		this.updateGrid()

		this.on('pointermove', this._onmousemove)
	}

	get hovered() {
		return this._hovered
	}

	get canvasSize() {
		return Math.min(super.width, super.height)
	}

	get canvasWidth() {
		return this.canvasSize
	}

	get canvasHeight() {
		return this.canvasSize
	}

	setGridSize(size) {
		this._gridSize = size
		this.updateGrid()
	}

	cellAt(clientX, clientY) {
		const { x, y } = this.zui.clientToSurface(clientX, clientY)

		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
	}

	updateGrid() {
		this._background.clear()
		this._cells.clear()

		this._addCanvasArea()
		this._addGridCells()

		this.zui.reset()
	}

	_cursorMovement(e) {
		const oldCell = this._hovered
		const cell = this.cellAt(e.offsetX, e.offsetY)

		if (cell && cell !== oldCell) {
			this._hovered = cell
			super.dispatch('grid_cell_hover', { cell })
		}
	}

	_addCanvasArea() {
		const canvasLength = Math.min(super.width, super.height)

		const shape = new Two.Rectangle(
			canvasLength / 2,
			canvasLength / 2, //
			canvasLength,
			canvasLength //
		)

		shape.fill = 'white'
		shape.stroke = 'none'

		this._background.add(shape)
	}

	_addGridCells() {
		const canvasLength = Math.min(super.width, super.height)
		const size = this._gridSize
		const cellSpacing = canvasLength / (size - 1)

		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				this._cells.add(
					new GridCell(col, row, size, cellSpacing) //
				)
			}
		}
	}
}
