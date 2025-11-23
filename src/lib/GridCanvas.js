import Two from 'two.js'
import Canvas from './Canvas.js'
import Group from './Group.js'
import GridCell from './GridCell.js'
import ArrayUtil from './ArrayUtil.js'

export default class GridCanvas extends Canvas {
	_cellsPerEdge = 1
	_cells = new Group()
	_hovered = null

	constructor(cellsPerEdge = 9) {
		super()

		this._cellsPerEdge = cellsPerEdge

		super.onload(() => {
			const cells = generateSquareGridCells(super.width, cellsPerEdge)

			for (const c of cells) {
				this._cells.add(c)
			}

			super.add(this._cells)
		})
	}

	get hovered() {
		return this._hovered
	}

	get cursorStyle() {
		return this.dom.style.cursor
	}

	set cursorStyle(style) {
		this.dom.style.cursor = style
	}

	cellAt(x, y) {
		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
	}

	cursorMove(e) {
		this._hovered = this.cellAt(e.offsetX, e.offsetY)
	}
}

function generateSquareGridCells(gridWidth, cellsPerEdge) {
	const cellWidth = gridWidth / cellsPerEdge
	const result = []

	ArrayUtil.walkGrid(cellsPerEdge, cellsPerEdge, (col, row) => {
		const c = new GridCell(col, row, cellWidth)
		c.init()
		result.push(c)
	})

	return result
}
