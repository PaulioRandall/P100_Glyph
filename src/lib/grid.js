import Two from 'two.js'
import { Group } from './ramen'
import GridCell from './GridCell.js'

const SIZE = 5

let INIT = false
let GROUP = new Group()
let CELLS = []
let LISTENERS = []

let HOVERED_CELL = null
let HIGHLIGHT_SHAPE = null

let MOUSE_DOWN = null

let LINES = new Group()
let LINE = null

export function addGrid(canvas) {
	destroyGrid(canvas)
	createGrid(canvas)
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

function createGrid(canvas) {
	CELLS = generateCellData(canvas.width, SIZE)
	GROUP = generateCellShapes(CELLS)
	GROUP.add(LINES)
	addEventListeners(canvas)

	canvas.add(GROUP)
	INIT = true
}

function generateCellData(width, size) {
	const length = width / size
	const result = []

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			const c = new GridCell(col, row, length)
			result.push(c)
		}
	}

	return result
}

function generateCellShapes(cells) {
	const g = new Group()

	for (const cell of cells) {
		g.add(createCellShape(cell))
	}

	return g
}

function createCellShape(cell) {
	const g = new Group()

	g.add(createCellCenterPoint(cell))
	//g.add(createCellBorder(cell))

	return g
}

function createCellCenterPoint({ x, y }) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}

function createCellBorder({ x, y, w, h }) {
	const shape = new Two.Rectangle(x, y, w, h)

	shape.fill = 'none'
	shape.stroke = 'black'
	shape.linewidth = 2

	return shape
}

function makeCellShape(cell) {
	const radius = 4
	const point = new Two.Circle(cell.centerX, cell.centerY, radius)

	point.fill = 'black'
	point.stroke = 'none'

	return new Two.Group(point)
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
