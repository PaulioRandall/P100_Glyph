import Two from 'two.js'
import Group from './Group.js'

export default class GridCell extends Group {
	_centerShape = null

	constructor(col, row, w, h) {
		super()

		const { x, y } = calcCenter(col, row, w, h)

		const widthRadius = w / 2
		const heightRadius = h / 2

		generateGetters(this, {
			col,
			row,
			w,
			h,
			x,
			y,
			left: x - w / 2,
			right: x + w / 2,
			top: y - h / 2,
			bottom: y + h / 2,
		})

		this._centerShape = createCenterShape(this)
	}

	group_added() {
		super.add(this._centerShape)
	}

	group_removed() {
		super.clear()
	}

	contains(x, y) {
		return x > this.left && x < this.right && y > this.top && y < this.bottom
	}
}

function calcCenter(col, row, w, h) {
	return {
		x: col * w + w / 2,
		y: row * h + h / 2,
	}
}

function createCenterShape({ x, y }) {
	const radius = 4
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
