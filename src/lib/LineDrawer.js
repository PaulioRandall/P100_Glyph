import { Group, EventUtil } from './ramen'
import Diagram from './Diagram.js'
import Line from './Line.js'

export default class LineDrawer extends Group {
	_canvas = null
	_diagram = new Diagram()

	_downButton = null
	_line = null

	constructor(canvas) {
		super()

		this._canvas = canvas
	}

	added() {
		super.add(this._diagram)
	}

	removed() {
		super.clear()

		this._downButton = null
		this._line = null
	}

	get diagram() {
		return this._diagram
	}

	mousedown(e) {
		if (this._downButton === null) {
			this._downButton = e.button
		}
	}

	mousemove() {
		const cell = this._canvas.hovered

		if (this._line && cell) {
			this._line.setEnd(cell)
		}
	}

	mouseup(e) {
		if (!EventUtil.isButton(e, this._downButton)) {
			return
		}

		this._downButton = null

		if (EventUtil.isLeftButton(e)) {
			this._newLine(this._canvas.hovered)
			return
		}

		if (EventUtil.isRightButton(e)) {
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
}
