import PathRenderer from './PathRenderer.js'

export default class Path extends PathRenderer {
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

	open() {
		this._closed = false
		this.updateShape()

		this.canvas.dispatch('element_updated', {
			element: this,
		})
	}

	close() {
		this._closed = true
		this.updateShape()

		this.canvas.dispatch('element_updated', {
			element: this,
		})
	}

	updateShape() {
		super.updateShape()

		const shape = this.shape
		shape.closed = this._closed

		if (shape.closed) {
			shape.fill = shape.stroke
		}

		this.updateStyle()
	}

	updateStyle() {
		if (this.canvas.selected === this) {
			this._updateColor('blue')
		} else if (this.canvas.focused === this) {
			this._updateColor('orange')
		} else {
			this._updateColor('indianred')
		}
	}

	_updateColor(color) {
		this._shape.stroke = color
		if (this._shape.closed) {
			this._shape.fill = color
		}
	}
}
