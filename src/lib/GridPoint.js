import Two from 'two.js'
import { Feature } from './ramen'

export default class GridPoint extends Feature {
	constructor(x, y) {
		super()

		this._shape = createShape(x, y)
		this.group.add(this._shape)
	}
}

function createShape(x, y) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}
