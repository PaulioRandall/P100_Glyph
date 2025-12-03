import PathRenderer from './PathRenderer.js'

// TODO: Could be merged with PathRenderer?

export default class BasePath extends PathRenderer {
	_closed = false

	constructor(canvas, commands, closed) {
		super(canvas)

		this.commands.push(...commands)
		this._closed = closed

		this.updateShape()
	}

	get closed() {
		return this._closed
	}

	set closed(v) {
		this._closed = v
	}

	updateShape() {
		super.updateShape()

		const shape = this.shape
		shape.closed = this._closed

		if (shape.closed) {
			shape.fill = shape.stroke
		}
	}

	updateColor(color) {
		const shape = this._shape

		shape.stroke = color
		shape.fill = shape.closed ? color : 'none'
	}
}
