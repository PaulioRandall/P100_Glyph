import PathRenderer from './PathRenderer.js'

// TODO: Merge with PathRenderer

export default class BasePath extends PathRenderer {
	constructor(canvas, commands, closed) {
		super(canvas)

		this.commands.push(...commands)
		this.updateShape({ closed })
	}

	get isClosed() {
		return this.shape.closed
	}

	get isVisible() {
		return this.shape.visible
	}

	edit(props) {
		this.updateShape(
			({ closed: this.shape.closed, visible: this.shape.visible } = props)
		)
	}

	updateShape(edits = {}) {
		super.updateShape()

		const shape = this.shape

		for (const key in edits) {
			shape[key] = edits[key]
		}

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
