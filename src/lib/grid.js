import Two from 'two.js'
import { Group } from './ramen'
import GridCell from './GridCell.js'

let INIT = false
let GROUP = new Group()
let CELLS = []
let LISTENERS = []

let HOVERED_CELL = null
let HIGHLIGHT_SHAPE = null

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

		clearHovered(canvas)
		canvas.remove(GROUP)

		CELLS.splice(0)
		GROUP.clear()
	}
}

function createGrid(canvas, cellsPerEdge) {
	CELLS = generateSquareGridCells(canvas.width, cellsPerEdge)
	GROUP = new Group(...CELLS)
	GROUP.add(LINES)
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

		clearHovered(canvas)
		HOVERED_CELL = identifyHoveredCell(cursor)

		if (HOVERED_CELL) {
			HIGHLIGHT_SHAPE = createHighlightShape(HOVERED_CELL)
			GROUP.add(HIGHLIGHT_SHAPE)
			canvas.dom.style.cursor = 'pointer'
		}

		if (HOVERED_CELL && LINE) {
			LINE.vertices[1].x = HOVERED_CELL.x
			LINE.vertices[1].y = HOVERED_CELL.y
		}
	}
}

function newCellMouseDownListener(canvas) {
	return (e) => {
		if (!MOUSE_DOWN) {
			MOUSE_DOWN = {
				cell: HOVERED_CELL,
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
			LINE = createLineShape()

			LINE.vertices[0].x = mouseDown.cell.x
			LINE.vertices[0].y = mouseDown.cell.y
			LINE.vertices[1].x = mouseDown.cell.x
			LINE.vertices[1].y = mouseDown.cell.y

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

function clearHovered(canvas) {
	HOVERED_CELL = null

	if (HIGHLIGHT_SHAPE) {
		GROUP.remove(HIGHLIGHT_SHAPE)
		HIGHLIGHT_SHAPE = null
		canvas.dom.style.cursor = 'auto'
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

function createHighlightShape({ x, y }) {
	const radius = 16
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'none'
	shape.stroke = 'slategrey'
	shape.linewidth = 12
	shape.opacity = 0.5

	return shape
}

function createLineShape() {
	const line = new Two.Line(0, 0, 0, 0)

	line.fill = 'none'
	line.stroke = 'indianred'
	line.linewidth = 16
	line.cap = 'round'

	return line
}
