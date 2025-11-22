import Two from 'two.js'
import Group from './Group.js'
import GridCell from './GridCell.js'
import Line from './Line.js'
import HoveredGridCell from './HoveredGridCell.js'
import Diagram from './Diagram.js'
import ArrayUtil from './ArrayUtil.js'
import GridCursorEvent from './GridCursorEvent.js'

export default class Grid extends Group {
	_canvas = null
	_cellsPerEdge = 1

	_cursor = new GridCursorEvent(this)

	_cells = new Group()
	_hoveredCell = new HoveredGridCell(this)

	_listeners = []

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

		this._addEventListeners()

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

	destroy() {
		this._canvas.remove(this)
		this._removeEventListeners()
		this._hoveredCell.unhover()
	}

	_addEventListeners() {
		this._listeners.push({
			type: 'mousemove',
			handler: this._newPointProximityListener(),
		})

		for (const { type, handler } of this._listeners) {
			this.canvas.dom.addEventListener(type, handler)
		}
	}

	_removeEventListeners() {
		ArrayUtil.removeAll(this._listeners, ({ type, handler }) => {
			this.canvas.dom.removeEventListener(type, handler)
		})
	}

	_newPointProximityListener() {
		const grid = this

		return (e) => {
			const hovered = grid._hoveredCell
			const cursor = grid._cursor

			cursor.updateFromEvent(e)
			hovered.unhover()

			if (cursor.cell) {
				hovered.hover(cursor.cell)
			}

			if (hovered.cell && grid._line) {
				grid._line.setEnd(hovered.cell)
			}
		}
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
