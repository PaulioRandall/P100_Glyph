import { Two, CanvasGroup } from '$ramen'

// TODO: Merge with PathRenderer

export default class BasePath extends CanvasGroup {
	static makeVertex(command) {
		return makeVertex(command)
	}

	_commands = []
	_shape = null

	get commands() {
		return this._commands
	}

	get shape() {
		return this._shape
	}

	get isClosed() {
		return this.shape.closed
	}

	get isVisible() {
		return this.shape.visible
	}

	constructor(canvas, commands = [], closed = false) {
		super(canvas)

		this.commands.push(...commands)
		this.updateShape({ closed })
	}

	edit(props) {
		this.updateShape(
			({
				closed: this.shape.closed, //
				visible: this.shape.visible, //
			} = props)
		)
	}

	updateShape(edits = {}) {
		const shape = makeShape(this._commands)

		this.clear()
		this.add(shape)

		for (const key in edits) {
			shape[key] = edits[key]
		}

		if (shape.closed) {
			shape.fill = shape.stroke
		}

		this._shape = shape
	}

	updateColor(color) {
		const shape = this._shape

		shape.stroke = color
		shape.fill = shape.closed ? color : 'none'
	}
}

function makeShape(cmds) {
	const path = new Two.Path(
		cmds.map(makeVertex),
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

function makeVertex({ type, to }) {
	// NOTE: Left and right control point handles of a
	//       Two.Anchor are relative to its position
	//       (i.e. x and y).
	//
	//       https://two.js.org/docs/anchor/

	const { x, y } = to
	return new Two.Anchor(x, y, 0, 0, 0, 0, 'line')
}
