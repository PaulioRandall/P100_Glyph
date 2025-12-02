import { Two, Group } from '$ramen'

export default class Path extends Group {
	_commands = []

	_shape = null
	_nodes = []

	_highlighted = false
	_selected = false

	constructor(cell) {
		super()

		this._addCommands(newMoveCommand(cell), newLineCommand(cell))
	}

	get commands() {
		return this._commands
	}

	isMultiPoint() {
		return this._commands.length > 2
	}

	moveTo(cell) {
		this._addCommands(newMoveCommand(cell))
	}

	lineTo(cell) {
		this._addCommands(newLineCommand(cell))
	}

	getLastShapePoint() {
		const lastIndex = this._lastShapePointIndex()
		return this._commands[lastIndex].to
	}

	removeLastPoint() {
		this._commands.pop()
		this._updatePath()
	}

	updateLastPoint(cell) {
		const lastIndex = this._lastPointIndex()
		this._commands[lastIndex].to = cell
		this._updatePath()
	}

	select(state = true) {
		this._selected = state
		this._updateLookAndFeel()
	}

	highlight(state = true) {
		this._highlighted = state
		this._updateLookAndFeel()
	}

	_lastPointIndex() {
		return this._commands.length - 1
	}

	_lastShapePointIndex() {
		return this._commands.length - 2
	}

	_addCommands(...cmds) {
		this._commands.push(...cmds)
		this._updatePath()
	}

	_updatePath() {
		const newShape = makePath(this._commands)
		const newNodes = makeNodes(this._commands)

		this._nodes.forEach((n) => this.remove(n))
		this.remove(this._shape)

		this.add(newShape)
		newNodes.forEach((n) => this.add(n))

		this._shape = newShape
		this._nodes = newNodes

		this._updateLookAndFeel()
	}

	_updateLookAndFeel() {
		const sel = this._selected
		const high = this._highlighted

		if (sel) {
			this._shape.stroke = 'blue'
		} else if (high) {
			this._shape.stroke = 'orange'
		} else {
			this._shape.stroke = 'indianred'
		}

		this._nodes.forEach((n) => (n.visible = sel))
	}
}

function newMoveCommand(to) {
	return {
		type: 'move',
		to,
	}
}

function newLineCommand(to) {
	return {
		type: 'line',
		to,
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
