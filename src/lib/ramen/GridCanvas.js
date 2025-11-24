import Two from 'two.js'
import Canvas from './Canvas.js'
import Group from './Group.js'
import GridCell from './GridCell.js'

export default class GridCanvas extends Canvas {
	_xLength = 0
	_yLength = 0
	_cells = new Group()
	_hovered = null

	constructor(container, xLength = 5, yLength = 5, options = {}) {
		super(container, options)

		this._xLength = xLength
		this._yLength = yLength

		const canvas = this

		super.onload(() => {
			canvas._load()
			return () => canvas._unload()
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

	mousemove(e) {
		this._hovered = this.cellAt(e.offsetX, e.offsetY)
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
