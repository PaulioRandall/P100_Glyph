import Two from 'two.js'
import Canvas from './Canvas.js'
import BaseGroup from './BaseGroup.js'
import GridCell from './GridCell.js'

export default class GridCanvas extends Canvas {
	_gridWidth = 9
	_gridHeight = 9
	_cells = new BaseGroup()
	_hovered = null
	_onmousemove = this._cursorMovement.bind(this)

	constructor(container, options = {}) {
		super(container, options)

		super.add(this._cells)
		this.updateGrid()

		this.on('mousemove', this._onmousemove)
	}

	get hovered() {
		return this._hovered
	}

	setGridSize(w, h) {
		this._gridWidth = w
		this._gridHeight = h
		this.updateGrid()
	}

	cellAt(x, y) {
		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
	}

	updateGrid() {
		this._cells.clear()

		const cells = generateSquareGridCells(
			super.width,
			super.height,
			this._gridWidth,
			this._gridHeight
		)

		cells.forEach((c) => this._cells.add(c))
	}

	_cursorMovement(e) {
		const oldCell = this._hovered
		const cell = this.cellAt(e.offsetX, e.offsetY)

		if (cell && cell !== oldCell) {
			this._hovered = cell

			super.dispatch('grid_cell_hover', { cell })
		}
	}
}

function generateSquareGridCells(w, h, xLength, yLength) {
	const cellWidth = w / xLength
	const cellHeight = h / yLength
	const result = []

	walkGrid(xLength, yLength, (col, row) => {
		const c = new GridCell(col, row, cellWidth, cellHeight)
		result.push(c)
	})

	return result
}

function walkGrid(numOfCols, numOfRows, forEachCell) {
	for (let row = 0; row < numOfRows; row++) {
		for (let col = 0; col < numOfCols; col++) {
			forEachCell(col, row)
		}
	}
}
