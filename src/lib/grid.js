import Two from 'two.js'
import { Group } from './ramen'

const SIZE = 5

let INIT = false
let GROUP = new Group()
let CELLS = []
let LISTENERS = []

let HOVERED_CELL = null
let HIGHLIGHT_SHAPE = null

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

		clearHovered()
		canvas.remove(GROUP)

		CELLS.splice(0)
		GROUP.clear()
	}
}

function createGrid(canvas) {
	CELLS = generateCellData(canvas.width, SIZE)
	GROUP = generateCellShapes(CELLS)
	addEventListeners(canvas)

	canvas.add(GROUP)
	INIT = true
}

function generateCellData(width, size) {
	const cellLength = width / size
	const result = []

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			result.push(makeCell(col, row, cellLength))
		}
	}

	return result
}

function makeCell(col, row, cellLength) {
	const top = cellLength * row
	const left = cellLength * col
	const centerOffset = cellLength / 2

	const cell = {
		col,
		row,
		left,
		right: left + cellLength,
		top,
		bottom: top + cellLength,
		x: left + centerOffset,
		y: top + centerOffset,
		w: cellLength,
		h: cellLength,
	}

	cell.contains = ({ x, y }) => {
		return x > cell.left && x < cell.right && y > cell.top && y < cell.bottom
	}

	return cell
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
	g.add(createCellBorder(cell))

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
	LISTENERS.push({
		type: 'mousemove',
		listener: newPointProximityListener(canvas),
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

		clearHovered()
		HOVERED_CELL = identifyHoveredCell(cursor)

		if (HOVERED_CELL) {
			HIGHLIGHT_SHAPE = createHighlightShape(HOVERED_CELL)
			GROUP.add(HIGHLIGHT_SHAPE)
		}
	}
}

function clearHovered() {
	HOVERED_CELL = null

	if (HIGHLIGHT_SHAPE) {
		GROUP.remove(HIGHLIGHT_SHAPE)
		HIGHLIGHT_SHAPE = null
	}
}

function identifyHoveredCell(cursor) {
	for (const c of CELLS) {
		if (c.contains(cursor)) {
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
