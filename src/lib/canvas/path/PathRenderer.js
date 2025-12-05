import { Two, CanvasGroup } from '$ramen'

export default class PathRenderer extends CanvasGroup {
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

	updateShape() {
		const newShape = makeShape(this._commands)

		this.clear()
		this.add(newShape)

		this._shape = newShape
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
