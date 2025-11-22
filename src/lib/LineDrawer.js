import Group from './Group.js'
import Diagram from './Diagram.js'
import Line from './Line.js'
import Cursor from './Cursor.js'

export default class LineDrawer extends Group {
	_canvas = null

	_downButton = null

	_diagram = new Diagram()
	_line = null

	constructor(canvas, grid) {
		super()

		this._canvas = canvas
		this._grid = grid

		this.add(this._diagram)
		canvas.add(this)
	}

	get canvas() {
		return this._canvas
	}

	get grid() {
		return this._grid
	}

	get diagram() {
		return this._diagram
	}

	cursorDown(e) {
		if (this._downButton === null) {
			this._downButton = e.button
		}
	}

	cursorMove() {
		const cell = this._grid.hoveredCell.cell

		if (this._line && cell) {
			this._line.setEnd(cell)
		}
	}

	cursorUp(_, cursor) {
		if (!cursor.isButton(this._downButton)) {
			return
		}

		this._downButton = null
		const cell = this._grid.hoveredCell.cell

		if (cursor.isLeftButton()) {
			this._newLine(cell)
			return
		}

		if (cursor.isRightButton()) {
			this._discardLine()
			return
		}
	}

	_discardLine() {
		if (this._line) {
			this.diagram.remove(this._line)
			this._line = null
		}
	}

	_newLine(cell) {
		this._line = new Line(cell)
		this.diagram.add(this._line)
	}

	destroy() {
		this._canvas.remove(this)
		this.remove(this._diagram)
	}
}
