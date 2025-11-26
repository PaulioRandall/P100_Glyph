import { Two, Group } from './ramen'

export default class Path extends Group {
	_shape = null

	constructor({ x, y }) {
		super()

		this._shape = createShape(x, y)
		super.add(this._shape)
	}

	get start() {
		return this.getVert(0)
	}

	get end() {
		return this.getVert(this.countVertices() - 1)
	}

	countVertices() {
		return this._shape.vertices.length
	}

	getVert(index) {
		return this._shape.vertices[index]
	}

	isSimple() {
		return this.countVertices() <= 2
	}

	isComplex() {
		return !this.isSimple()
	}

	setStart({ x, y }) {
		this.start.x = x
		this.start.y = y
	}

	setEnd({ x, y }) {
		this.end.x = x
		this.end.y = y
	}

	pushVertex() {
		this._shape.vertices.push(this.end.clone())
	}

	popVertex() {
		const vert = this._shape.vertices.pop()
		return {
			x: vert.x,
			y: vert.y,
		}
	}
}

function createShape(x, y) {
	const path = new Two.Path(
		[
			// Start by moving to the { x, y }
			new Two.Anchor(x, y, x, y, x, y, 'move'),
			// Draws a line, but since we don't yet know where
			// the user wants the end of the line we'll just keep
			// it as the same as the start point for now.
			new Two.Anchor(x, y, x, y, x, y, 'line'),
		],
		false, // Not closed path
		false, // Not curved
		false // Two.js controls plotting
	)

	path.fill = 'none'
	path.stroke = 'indianred'
	path.linewidth = 16
	path.cap = 'round'
	path.join = 'round'

	return path
}
