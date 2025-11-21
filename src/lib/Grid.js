import Two from 'two.js'
import { Group } from './ramen'
import GridCell from './GridCell.js'
import Line from './Line.js'
import HoveredGridCell from './HoveredGridCell.js'
import Diagram from './Diagram.js'
import ArrayUtil from './ArrayUtil.js'
import GridCursorEvent from './GridCursorEvent.js'

export default class Grid extends Group {
	_canvas = null
	_cellsPerEdge = 7

	_cursor = new GridCursorEvent(this)
	_mouseDown = null

	_cells = new Group()
	_hoveredCell = new HoveredGridCell(this)

	_listeners = []

	// TODO: This shouldn't be in the grid class
	_diagram = new Diagram()
	_line = null

	constructor(canvas, cellsPerEdge = 5) {
		super()

		this._canvas = canvas
		this._cellsPerEdge = cellsPerEdge

		this.add(this._cells)
		this.add(this._hoveredCell)
		this.add(this._diagram)

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
		const add = this.canvas.dom.addEventListener
		add('mousedown', this._newCellMouseDownListener())
		add('mousemove', this._newPointProximityListener())
		add('mouseup', this._newCellMouseUpListener())
	}

	_removeEventListeners() {
		ArrayUtil.removeAll(this._listeners, ({ type, listener }) => {
			this.canvas.dom.removeEventListener(type, listener)
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

	// TODO: Shouldn't be in the grid class
	_newCellMouseDownListener() {
		const grid = this

		return (e) => {
			if (!grid._mouseDown) {
				grid._mouseDown = new GridCursorEvent(grid)
				grid._mouseDown.updateFromEvent(e)
			}
		}
	}

	_newCellMouseUpListener() {
		const grid = this

		return (e) => {
			const mouseDown = grid._mouseDown
			const diagram = grid._diagram

			if (!mouseDown?.isButton(e.button)) {
				return
			}

			grid._mouseDown = null

			function newLine() {
				grid._line = new Line(mouseDown.cell)
				diagram.add(grid._line)
			}

			if (!grid._line) {
				newLine()
				return
			}

			if (mouseDown.isRightButton()) {
				diagram.remove(grid._line)
				grid._line = null
				return
			}

			if (mouseDown.isLeftButton()) {
				grid._line = null
				newLine()
				return
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
