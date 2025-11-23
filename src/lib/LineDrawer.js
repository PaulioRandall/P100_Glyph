import Group from './Group.js'
import Diagram from './Diagram.js'
import Line from './Line.js'
import Cursor from './Cursor.js'

export default class LineDrawer extends Group {
	_downButton = null
	_diagram = new Diagram()
	_line = null

	constructor(hoveredCell) {
		super()
		super.add(this._diagram)

		this._hoveredCell = hoveredCell
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
		const cell = this._hoveredCell.get()

		if (this._line && cell) {
			this._line.setEnd(cell)
		}
	}

	cursorUp(_, cursor) {
		if (!cursor.isButton(this._downButton)) {
			return
		}

		this._downButton = null
		const cell = this._hoveredCell.get()

		if (cursor.isLeftButton()) {
			this._newLine(cell)
			return
		}

		if (cursor.isRightButton()) {
			this._discardLine()
			return
		}
	}

	free() {
		this.clear()

		this._downButton = null
		this._diagram = null
		this._line = null
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
}
