import Two from 'two.js'
import GridPoint from './GridPoint.js'
import { Feature } from './ramen'

export default class Grid extends Feature {
	constructor(canvas) {
		super()

		this._canvas = canvas
		this._size = 5

		this._pointLocations = []
		this._points = []

		this.resize()
	}

	get canvas() {
		return this._canvas
	}

	resize() {
		this._clear()
		this._regeneratePointLocations()
		this._renderPoints()
	}

	_clear() {
		const points = this._points

		while (points.length > 0) {
			const p = points.pop()
			this.group.remove(p.group)
		}
	}

	_regeneratePointLocations() {
		const locations = generatePointLocations(
			this._canvas.two.width,
			this._size,
			0.5 // Grid padding
		)

		this._pointLocations.splice(0, this._pointLocations.length, ...locations)
	}

	_renderPoints() {
		for (const pl of this._pointLocations) {
			const p = new GridPoint(pl.x, pl.y)
			this._points.push(p)
		}

		for (const p of this._points) {
			this.group.add(p.group)
		}
	}
}

function generatePointLocations(totalWidth, numberOfPoints, gridPadding) {
	const gap = gapBetweenPoints(totalWidth, numberOfPoints, gridPadding)
	const result = []

	for (let row = 0; row < numberOfPoints; row++) {
		for (let col = 0; col < numberOfPoints; col++) {
			result.push(generatePointLocation(col, row, gridPadding, gap))
		}
	}

	return result
}

function gapBetweenPoints(width, numberOfPoints, paddingRelativeToGap) {
	return width / (numberOfPoints - 1 + paddingRelativeToGap * 2)
}

function generatePointLocation(x, y, offset, gap) {
	return {
		x: (x + offset) * gap,
		y: (y + offset) * gap,
	}
}
