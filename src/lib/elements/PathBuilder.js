import { Two, CanvasGroup } from '$ramen'
import Path from './Path.js'

export default class PathBuilder extends CanvasGroup {
	_commands = []
	_cursor = null
	_shape = null

	constructor(canvas, cell) {
		super(canvas)

		this.moveCursorTo(cell)
		this.moveTo(cell, true)
	}

	get commands() {
		return this._commands
	}

	get cursor() {
		return this._cursor
	}

	moveCursorTo(cell) {
		this._cursor = cell
		this._updateShape()
	}

	moveTo(cell, ignoreDuplicate = false) {
		if (!ignoreDuplicate && this.isDuplicatePoint(cell)) {
			return
		}

		const cmd = makeMoveCommand(cell)
		this._commands.push(cmd)
		this._updateShape()
	}

	lineTo(cell) {
		if (this.isDuplicatePoint(cell)) {
			return
		}

		const cmd = makeLineCommand(cell)
		this._commands.push(cmd)
		this._updateShape()
	}

	removeLastCommand() {
		this._commands.pop()
		this._updateShape()
	}

	// Is the cell the same as the last command's cell?
	isDuplicatePoint(cell) {
		return this._last().to === cell
	}

	// End point is the same as the start point.
	isImplicitlyClosed() {
		return this._first().to === this._last().to
	}

	isEmpty() {
		return this._commands.length < 1
	}

	hasEnoughPoints() {
		return this._commands.length > 1
	}

	build() {
		let closed = false

		if (this.isImplicitlyClosed()) {
			this.removeLastCommand()
			closed = true
		}

		if (this.hasEnoughPoints()) {
			return new Path(this.canvas, this._commands, closed)
		}

		return null
	}

	_first() {
		return this._commands[0]
	}

	_last() {
		const lastIndex = this._commands.length - 1
		return this._commands[lastIndex]
	}

	_updateShape() {
		const newShape = makePath(this._commands, this._cursor)

		this.clear()
		this.add(newShape)

		this._shape = newShape
	}
}

function makeMoveCommand(to) {
	return {
		type: 'move',
		to,
	}
}

function makeLineCommand(to) {
	return {
		type: 'line',
		to,
	}
}

function makePath(cmds, cursor) {
	const path = new Two.Path(
		makeAnchors(cmds, cursor),
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

function makeAnchors(cmds, cursor) {
	const anchors = []

	for (const cmd of cmds) {
		anchors.push(makeAnchor(cmd))
	}

	anchors.push(makeAnchor(makeLineCommand(cursor)))

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
