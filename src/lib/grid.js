import Two from 'two.js'
import { Group } from './ramen'

const SIZE = 5

let CELLS = []
let GROUP = new Group()
let INIT = false

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
		canvas.remove(GROUP)

		CELLS.splice(0)
		GROUP.clear()
	}
}

function createGrid(canvas) {
	CELLS = generateCellData(canvas.width, SIZE)
	GROUP = generateCellShapes(CELLS)

	//addEventListeners(canvas, GROUP)

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

	return {
		left,
		right: left + cellLength,
		top,
		bottom: top + cellLength,
		x: left + centerOffset,
		y: top + centerOffset,
		w: cellLength,
		h: cellLength,
	}
}

function generateCellShapes(cells) {
	const g = new Two.Group()

	for (const cell of cells) {
		g.add(createCellShape(cell))
	}

	return g
}

function createCellShape(cell) {
	const g = new Two.Group()

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
	shape.strokeWidth = 2

	return shape
}

function makeCellShape(cell) {
	const radius = 4
	const point = new Two.Circle(cell.centerX, cell.centerY, radius)

	point.fill = 'black'
	point.stroke = 'none'

	return new Two.Group(point)
}

function addEventListeners(canvas) {}

function pointProximityListener(e) {}
