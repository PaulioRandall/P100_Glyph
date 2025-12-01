import { Two, Group } from '$ramen'

export default class Path extends Group {
	_commands = []
	_shape = null

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

	removeLastPoint() {
		this._commands.pop()
		this._updateShape()
	}

	updateLastPoint(cell) {
		const lastIndex = this._commands.length - 1
		this._commands[lastIndex].to = cell
		this._updateShape()
	}

	_addCommands(...cmds) {
		this._commands.push(...cmds)
		this._updateShape()
	}

	_updateShape() {
		const newShape = createPathFromCommands(this._commands)

		this.remove(this._shape)
		this.add(newShape)

		this._shape = newShape
	}

	select() {
		this._shape.stroke = 'blue'
	}

	unselect() {
		this._shape.stroke = 'indianred'
	}

	highlight() {
		this._shape.stroke = 'orange'
	}

	unhighlight() {
		this._shape.stroke = 'indianred'
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

function createPathFromCommands(cmds) {
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
