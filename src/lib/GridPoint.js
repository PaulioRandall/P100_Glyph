import Two from 'two.js'
import { Stack } from './ramen'

export default class GridPoint extends Stack {
	constructor(grid, x, y) {
		super()

		this._grid = grid
		this._shape = createShape(x, y)
		this._base._twoGroup.add(this._shape)
	}
}

function createShape(x, y) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}
