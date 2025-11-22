import Two from 'two.js'
import Group from './Group.js'

export default class GridCell extends Group {
	x = 0
	y = 0

	w = 0
	h = 0

	col = 0
	row = 0

	left = 0
	right = 0
	top = 0
	bottom = 0

	centerShape = null
	borderShape = null

	isHovered = false

	constructor(col, row, length) {
		super()

		this.col = col
		this.row = row

		this.top = row * length
		this.left = col * length

		this.bottom = this.top + length
		this.right = this.left + length

		this.w = length
		this.h = length

		const halfLength = length / 2
		this.x = this.left + halfLength
		this.y = this.top + halfLength
	}

	init() {
		this.centerShape = createCenterShape(this)
		super.add(this.centerShape)

		//this.borderShape = createBorderShape(this)
		//super.add(this.borderShape)
	}

	contains(x, y) {
		return x > this.left && x < this.right && y > this.top && y < this.bottom
	}
}

function createCenterShape({ x, y }) {
	const radius = 4
	const shape = new Two.Circle(x, y, radius)

	shape.fill = 'black'
	shape.stroke = 'none'

	return shape
}

function createBorderShape({ x, y, w, h }) {
	const shape = new Two.Rectangle(x, y, w, h)

	shape.fill = 'none'
	shape.stroke = 'black'
	shape.linewidth = 2

	return shape
}
