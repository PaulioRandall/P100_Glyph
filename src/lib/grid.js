import Two from 'two.js'
import { Group } from './ramen'

const GROUP = new Group()
const SIZE = 5

export function addGrid(canvas) {
	removeGrid(canvas)
	addGridPoints(canvas, GROUP, SIZE)
	canvas.add(GROUP)
}

export function removeGrid(canvas) {
	GROUP.clear()
	canvas.remove(GROUP)
}

function addGridPoints(canvas, group, size) {
	const totalWidth = canvas.width
	const gridPadding = 0.5
	const gap = gapBetweenPoints(totalWidth, size, gridPadding)

	forEachSquareGridCell(
		size,
		(col, row) => {
			const { x, y } = calcPointLocation(col, row, gridPadding, gap)
			const p = createPointShape(x, y)
			group.add(p)
		}
	)
}

function gapBetweenPoints(width, numberOfPoints, paddingRelativeToGap) {
	return width / (numberOfPoints - 1 + paddingRelativeToGap * 2)
}

function forEachSquareGridCell(size, f) {
	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			f(col, row)
		}
	}
}

function calcPointLocation(x, y, offset, gap) {
	return {
		x: (x + offset) * gap,
		y: (y + offset) * gap,
	}
}

function createPointShape(x, y) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}
