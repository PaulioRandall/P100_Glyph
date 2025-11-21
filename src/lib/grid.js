import Two from 'two.js'
import { Group } from './ramen'
import GridCell from './GridCell.js'
import Line from './Line.js'
import SelectedGridCell from './SelectedGridCell.js'

let INIT = false
let GROUP = new Group()

let CELLS = []
let SELECTED = null

let LISTENERS = []

let MOUSE_DOWN = null

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

		SELECTED.deselect()
		canvas.remove(GROUP)

		CELLS.splice(0)
		GROUP.clear()
	}
}

function createGrid(canvas, cellsPerEdge) {
	CELLS = generateSquareGridCells(canvas.width, cellsPerEdge)

	SELECTED = new SelectedGridCell(canvas)
	SELECTED.init()

	GROUP = new Group(...CELLS)
	GROUP.add(LINES)
	GROUP.add(SELECTED)

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
		const cursor = {
			x: e.offsetX,
			y: e.offsetY,
		}

		SELECTED.deselect()
		const hoveredCell = identifyHoveredCell(cursor)

		if (hoveredCell) {
			SELECTED.select(hoveredCell)
		}

		if (hoveredCell && LINE) {
			LINE.setEnd(hoveredCell)
		}
	}
}

function newCellMouseDownListener(canvas) {
	return (e) => {
		if (!MOUSE_DOWN) {
			MOUSE_DOWN = {
				cell: SELECTED.cell,
				button: e.button,
			}
		}
	}
}

function newCellMouseUpListener(canvas) {
	return (e) => {
		const mouseDown = MOUSE_DOWN
		MOUSE_DOWN = null

		const LEFT = 0
		const RIGHT = 2

		if (!mouseDown || mouseDown.button !== e.button) {
			return
		}

		function newLine() {
			LINE = new Line()
			LINE.init()

			LINE.setStart(mouseDown.cell)
			LINE.setEnd(mouseDown.cell)

			LINES.add(LINE)
		}

		if (!LINE) {
			newLine()
			return
		}

		if (mouseDown.button === RIGHT) {
			LINES.remove(LINE)
			LINE = null
			return
		}

		if (mouseDown.button === LEFT) {
			LINE = null
			newLine()
			return
		}
	}
}

function identifyHoveredCell(cursor) {
	for (const c of CELLS) {
		if (c.contains(cursor.x, cursor.y)) {
			return c
		}
	}

	return null
}
