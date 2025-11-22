import Group from './Group.js'
import Diagram from './Diagram.js'
import Line from './Line.js'
import GridCursorEvent from './GridCursorEvent.js'

export default class LineDrawer extends Group {
	_canvas = null
	_mouseDown = null
	_listeners = []

	_diagram = new Diagram()
	_line = null

	constructor(canvas, grid) {
		super()

		this._canvas = canvas
		this._grid = grid

		this.add(this._diagram)
		this._addEventListeners()

		canvas.add(this)
	}

	get canvas() {
		return this._canvas
	}

	get grid() {
		return this._grid
	}

	destroy() {
		this._removeEventListeners()
	}

	_addEventListeners() {
		this._listeners.push({
			type: 'mousedown',
			handler: this._newCellMouseDownListener(),
		})

		this._listeners.push({
			type: 'mousemove',
			handler: this._newMouseMovedListener(),
		})

		this._listeners.push({
			type: 'mouseup',
			handler: this._newCellMouseUpListener(),
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

	_newCellMouseDownListener() {
		const drawer = this

		return (e) => {
			if (!drawer._mouseDown) {
				drawer._mouseDown = new GridCursorEvent(drawer.grid)
				drawer._mouseDown.updateFromEvent(e)
			}
		}
	}

	_newMouseMovedListener() {
		const drawer = this

		return (e) => {
			const cell = drawer._grid.cursor.cell

			if (drawer._line && cell) {
				drawer._line.setEnd(cell)
			}
		}
	}

	_newCellMouseUpListener() {
		const drawer = this

		return (e) => {
			const mouseDown = drawer._mouseDown
			const diagram = drawer._diagram

			if (!mouseDown?.isButton(e.button)) {
				return
			}

			drawer._mouseDown = null

			function newLine() {
				drawer._line = new Line(mouseDown.cell)
				diagram.add(drawer._line)
			}

			if (!drawer._line) {
				newLine()
				return
			}

			if (mouseDown.isRightButton()) {
				diagram.remove(drawer._line)
				drawer._line = null
				return
			}

			if (mouseDown.isLeftButton()) {
				drawer._line = null
				newLine()
				return
			}
		}
	}
}
