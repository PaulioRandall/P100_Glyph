import Two from 'two.js'
import Canvas from './Canvas.js'
import Group from './Group.js'
import GridCell from './GridCell.js'

export default class GridCanvas extends Canvas {
	_xLength = 0
	_yLength = 0
	_cells = new Group()
	_focus = null

	constructor(container, xLength = 5, yLength = 5, options = {}) {
		super(container, options)

		this._xLength = xLength
		this._yLength = yLength

		const canvas = this

		this.load(() => {
			this._load()

			const unlisten = this.listen('mousemove', this._mousemove.bind(this))

			return () => {
				unlisten()
				this._unload()
			}
		})
	}

	get hovered() {
		return this._focus
	}

	cellAt(x, y) {
		for (const cell of this._cells.children) {
			if (cell.contains(x, y)) {
				return cell
			}
		}

		return null
	}

	_mousemove(e) {
		const oldCell = this._focus
		const cell = this.cellAt(e.offsetX, e.offsetY)

		if (cell && cell !== oldCell) {
			this._focus = cell
			this._dispatchHoveredCellChange(cell)
		}
	}

	_dispatchHoveredCellChange(cell) {
		super.dispatch('grid_cell_focus', {
			cell,
		})
	}

	_load() {
		const cells = generateSquareGridCells(
			super.width,
			super.height,
			this._xLength,
			this._yLength
		)

		for (const c of cells) {
			this._cells.add(c)
		}

		super.add(this._cells)
	}

	_unload() {
		super.clear()
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
