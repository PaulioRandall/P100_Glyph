import Two from 'two.js'
import Group from './Group.js'
import GridCell from './GridCell.js'
import ArrayUtil from './ArrayUtil.js'

export default class Grid extends Group {
	_cellsPerEdge = 1
	_cells = new Group()

	constructor(canvasWidth, cellsPerEdge = 9) {
		super()
		super.add(this._cells)

		this._cellsPerEdge = cellsPerEdge

		const cells = generateSquareGridCells(canvasWidth, cellsPerEdge)

		for (const c of cells) {
			this._cells.add(c)
		}
	}

	get cursor() {
		return this._cursor
	}

	cellAt(x, y) {
		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
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
