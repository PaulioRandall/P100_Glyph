import Two from 'two.js'
import { Group } from './ramen'

export default class Line extends Group {
	lineShape = null

	init() {
		this.lineShape = createLineShape()
		super.add(this.lineShape)
	}

	countVertices() {
		return this.lineShape.vertices.length
	}

	getVert(index) {
		return this.lineShape.vertices[index]
	}

	get start() {
		return this.getVert(0)
	}

	get end() {
		return this.getVert(this.countVertices() - 1)
	}

	setStart({ x, y }) {
		this.start.x = x
		this.start.y = y
	}

	setEnd({ x, y }) {
		this.end.x = x
		this.end.y = y
	}
}

function createLineShape() {
	const line = new Two.Line(0, 0, 0, 0)

	line.fill = 'none'
	line.stroke = 'indianred'
	line.linewidth = 16
	line.cap = 'round'

	return line
}
