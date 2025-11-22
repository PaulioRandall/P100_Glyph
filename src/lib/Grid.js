import Two from 'two.js'
import Group from './Group.js'
import GridCell from './GridCell.js'
import HoveredGridCell from './HoveredGridCell.js'
import ArrayUtil from './ArrayUtil.js'

export default class Grid extends Group {
	_canvas = null
	_cellsPerEdge = 1
	_cells = new Group()
	_hoveredCell = new HoveredGridCell(this)

	constructor(canvas, cellsPerEdge = 9) {
		super()

		this._canvas = canvas
		this._cellsPerEdge = cellsPerEdge

		this.add(this._cells)
		this.add(this._hoveredCell)

		const cells = generateSquareGridCells(canvas.width, cellsPerEdge)

		for (const c of cells) {
			this._cells.add(c)
		}

		this._canvas.add(this)
	}

	get canvas() {
		return this._canvas
	}

	get cursor() {
		return this._cursor
	}

	get hoveredCell() {
		return this._hoveredCell
	}

	cellAt(x, y) {
		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
	}

	// TODO: Move hovered cell to canvas.
	//       Grid should be static element.
	cursorMove(e, cursor) {
		this._hoveredCell.cursorMoved(e, cursor)
	}

	destroy() {
		this._canvas.remove(this)
		this._hoveredCell.unhover()
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
