import { Two, CanvasGroup } from '$ramen'

// TODO: Abstract 'PathRenderer' so 'Path' and
//       'PathBuilder' have the same mechanics for
//       rendering paths.
// TODO: Clean up and optimise.
// TODO: Visual nodes show be controlled by an organ made
//       specifically for it. This way it will always be
//       rendered above all components.
// TODO: Add 'canBeShape' func that returns true if shape
//       has more than two points.

export default class Path extends CanvasGroup {
	_commands = []

	_shape = null
	_closed = false
	_nodes = []

	_highlighted = false
	_selected = false

	constructor(canvas, commands, closed) {
		super(canvas)

		this._commands = commands
		this._closed = closed

		this._updatePath()
	}

	get commands() {
		return this._commands
	}

	get closed() {
		return this._closed
	}

	open() {
		this._closed = false
		this._updatePath()

		this.canvas.dispatch('element_updated', {
			element: this,
		})
	}

	close() {
		this._closed = true
		this._updatePath()

		this.canvas.dispatch('element_updated', {
			element: this,
		})
	}

	select(state = true) {
		this._selected = state
		this._updateLookAndFeel()
	}

	highlight(state = true) {
		this._highlighted = state
		this._updateLookAndFeel()
	}

	_updatePath() {
		this.clear()

		const newShape = makePath(this._commands)
		const newNodes = makeNodes(this._commands)

		newShape.closed = this._closed
		if (newShape.closed) {
			newShape.fill = newShape.stroke
		}

		this._shape = newShape
		this._nodes = newNodes

		this.add(this._shape)
		this._nodes.forEach((n) => this.add(n))

		this._updateLookAndFeel()
	}

	_updateLookAndFeel() {
		const sel = this._selected
		const high = this._highlighted

		if (sel) {
			this._updateColor('blue')
		} else if (high) {
			this._updateColor('orange')
		} else {
			this._updateColor('indianred')
		}

		this._nodes.forEach((n) => (n.visible = sel))
	}

	_updateColor(color) {
		this._shape.stroke = color
		if (this._shape.closed) {
			this._shape.fill = color
		}
	}
}

function makePath(cmds) {
	const path = new Two.Path(
		makeAnchors(cmds),
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

function makeAnchors(cmds) {
	const anchors = []

	for (const cmd of cmds) {
		anchors.push(makeAnchor(cmd))
	}

	return anchors
}

function makeAnchor(cmd) {
	// NOTE: Left and right control point handles of a
	//       Two.Anchor are relative to its position
	//       (i.e. x and y).
	//
	//       https://two.js.org/docs/anchor/

	const { x, y } = cmd.to

	switch (cmd.type) {
		case 'move':
			return new Two.Anchor(x, y, 0, 0, 0, 0, 'move')
		case 'line':
			return new Two.Anchor(x, y, 0, 0, 0, 0, 'line')
		default:
			throw new Error(`Unknown command type '${cmd.type}'`)
	}
}

function makeNodes(cmds) {
	const nodes = []

	for (const cmd of cmds) {
		nodes.push(makeNode(cmd))
	}

	return nodes
}

function makeNode(cmd) {
	const radius = 16
	const { x, y } = cmd.to

	const circle = new Two.Circle(x, y, radius)

	circle.visible = false
	circle.fill = 'lightblue'
	circle.stroke = 'black'
	circle.linewidth = 4

	return circle
}
