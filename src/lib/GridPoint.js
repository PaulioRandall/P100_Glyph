import Two from 'two.js'

export default class GridPoint extends Two.Group {
	constructor(grid, x, y) {
		super()

		this._grid = grid
		this._shape = createShape(x, y)
		this.add(this._shape)
	}
}

function createShape(x, y) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}
