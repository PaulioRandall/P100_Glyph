import Two from 'two.js'
import BaseGroup from './BaseGroup.js'

export default class GridCell extends BaseGroup {
	_shape = null

	constructor(col, row, length, shadow) {
		super()

		const { x, y } = calcCenter(col, row, length)
		const halfLength = length / 2

		generateGetters(this, {
			col,
			row,
			w: length,
			h: length,
			x,
			y,
			left: x - halfLength,
			right: x + halfLength,
			top: y - halfLength,
			bottom: y + halfLength,
		})

		this._shape = createCenterShape(this, shadow)

		super.add(this._shape)
	}

	contains(x, y) {
		return x > this.left && x < this.right && y > this.top && y < this.bottom
	}
}

function calcCenter(col, row, length) {
	return {
		x: col * length + length / 2,
		y: row * length + length / 2,
	}
}

function createCenterShape({ x, y }, shadow) {
	const radius = shadow ? 2 : 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}

function generateGetters(object, members) {
	for (const name in members) {
		Object.defineProperty(object, name, {
			get: function () {
				return members[name]
			},
		})
	}
}
