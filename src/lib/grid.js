import Two from 'two.js'
import { Group } from './ramen'
import GridCell from './GridCell.js'
import Line from './Line.js'
import HoveredGridCell from './HoveredGridCell.js'
import Cursor from './Cursor.js'
import Diagram from './Diagram.js'

let INIT = false
let GROUP = new Group()

let CELLS = []

let CURSOR = null
let MOUSE_DOWN = null
let HOVERED = null

let LISTENERS = []

// TODO: Could be contained within a 'Diagram' class
let LINES = new Group()
let LINE = null

export function addGrid(canvas, cellsPerEdge = 7) {
	destroyGrid(canvas)
	createGrid(canvas, cellsPerEdge)
}

export function removeGrid(canvas) {
	destroyGrid(canvas)
}

function destroyGrid(canvas) {
	if (INIT) {
		INIT = false

		removeEventListeners(canvas)

		HOVERED.unhover()
		canvas.remove(GROUP)

		CELLS.splice(0)
		GROUP.clear()
	}
}

function createGrid(canvas, cellsPerEdge) {
	CELLS = generateSquareGridCells(canvas.width, cellsPerEdge)

	HOVERED = new HoveredGridCell(canvas)
	HOVERED.init()

	GROUP = new Group(...CELLS)
	GROUP.add(LINES)
	GROUP.add(HOVERED)

	addEventListeners(canvas)

	canvas.add(GROUP)
	INIT = true
}

function generateSquareGridCells(gridWidth, cellsPerEdge) {
	const cellWidth = gridWidth / cellsPerEdge
	const result = []

	for (let row = 0; row < cellsPerEdge; row++) {
		for (let col = 0; col < cellsPerEdge; col++) {
			const c = new GridCell(col, row, cellWidth)
			c.init()
			result.push(c)
		}
	}

	return result
}

function addEventListeners(canvas) {
	newCellMouseDownListener
	LISTENERS.push({
		type: 'mousedown',
		listener: newCellMouseDownListener(canvas),
	})

	LISTENERS.push({
		type: 'mousemove',
		listener: newPointProximityListener(canvas),
	})

	LISTENERS.push({
		type: 'mouseup',
		listener: newCellMouseUpListener(canvas),
	})

	for (const l of LISTENERS) {
		canvas.dom.addEventListener(l.type, l.listener)
	}
}

function removeEventListeners(canvas) {
	for (const l of LISTENERS) {
		canvas.dom.removeEventListener(l.type, l.listener)
	}
	LISTENERS = []
}

function newPointProximityListener(canvas) {
	return (e) => {
		HOVERED.unhover()
		CURSOR = Cursor.fromEvent(e, CELLS)

		if (CURSOR.gridCell) {
			HOVERED.hover(CURSOR.gridCell)
		}

		if (CURSOR.gridCell && LINE) {
			LINE.setEnd(CURSOR.gridCell)
		}
	}
}

function newCellMouseDownListener(canvas) {
	return (e) => {
		if (!MOUSE_DOWN) {
			MOUSE_DOWN = Cursor.fromEvent(e, CELLS)
		}
	}
}

function newCellMouseUpListener(canvas) {
	return (e) => {
		const mouseDown = MOUSE_DOWN
		MOUSE_DOWN = null

		if (!mouseDown || !mouseDown.isButton(e.button)) {
			return
		}

		function newLine() {
			LINE = new Line(mouseDown.gridCell)
			LINES.add(LINE)
		}

		if (!LINE) {
			newLine()
			return
		}

		if (mouseDown.isRightButton()) {
			LINES.remove(LINE)
			LINE = null
			return
		}

		if (mouseDown.isLeftButton()) {
			LINE = null
			newLine()
			return
		}
	}
}
