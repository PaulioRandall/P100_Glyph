import { NAME_SPACE } from './cheddar.js'
import List from './List.js'
import Elemental from './Elemental.js'
import Command from './Command.js'

// Class for drawing an SVG Path.
export default class Path extends Elemental {
	// Same as constructing the Path class directly.
	static from(x, y) {
		return new Path(x, y)
	}

	// Creates rectangle as a Path.
	static rect(left, top, right, bottom) {
		return new Path(left, top)
			.lineTo(right, top) //
			.lineTo(right, bottom) //
			.lineTo(left, bottom) //
			.lineToClose() //
	}

	_commands = new List()
	_closed = false

	// Argument:
	// [0] X value for an initial move command.
	// [1] Y value for an initial move command.
	constructor(x = null, y = null) {
		super()

		this.attr('xlmns', NAME_SPACE)
		this.attr('stroke', 'black')
		this.attr('fill', 'none')
		this.attr('d', this.toString())

		this._generateElement()

		if (x !== null && x !== undefined) {
			this.moveTo(x, y)
		}
	}

	get commands() {
		return this._commands
	}

	get isClosed() {
		return this._closed
	}

	// Append a command to the path.
	addCommand(cmd) {
		this._addCmd(cmd)
		this.updateElement()
		this.updated()
		return this
	}

	// Remove a command from the path.
	removeCommand(cmd) {
		if (this._removeCmd(cmd)) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	// Removes all commadns from the path.
	clear() {
		let removed = false
		for (const cmd of [...this._commands]) {
			removed || this._removeCmd(cmd)
		}

		if (removed) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	// Creates a new move command to {x,y}.
	moveTo(x, y) {
		this._addCmd(Command.move(x, y))
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a new line command to {x,y}.
	lineTo(x, y) {
		this._addCmd(Command.line(x, y))
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a new line to the first commands X and Y
	// values.
	lineToClose() {
		const { x, y } = this.commands[0]
		this._addCmd(Command.line(x, y))
		this._close()
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending at {x,y}.
	quadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this._addCmd(cmd)
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending the X and Y point of the first command.
	quadraticToClose(cp1X, cp1Y) {
		const { x, y } = this.commands[0]
		this._addCmd(Command.quadratic(cp1X, cp1Y, x, y))
		this._close()
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a cubic curve via the {cp1X,cp1Y} and
	// {cp2X,cp2Y} to {x,y}.
	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this._addCmd(cmd)
		this.updateElement()
		this.updated()
		return this
	}

	// Creates a cubic curve via the {cp1X,cp1Y} and
	// {cp2X,cp2Y} and ending the X and Y point of the first
	// command.
	cubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		const { x, y } = this.commands[0]
		this._addCmd(Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y))
		this._close()
		this.updateElement()
		this.updated()
		return this
	}

	// Create a close command and append it to the path. All
	// commands added after will be inserted before the close
	// command.
	close() {
		if (this._close()) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	// Removes the close command from the end of the command
	// list, if it exists.
	open() {
		if (this._open()) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	// Moves all elements by dx on the X plane. dx may be
	// negative.
	moveX(dx) {
		if (this._moveX(dx)) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	_moveX(dx) {
		if (this._commands.length === 0) {
			return false
		}

		for (const cmd of this._commands) {
			cmd.moveX(dx)
		}

		return true
	}

	// Moves the elements by dy on the Y plane. dy may be
	// negative.
	moveY(dy) {
		if (this._moveY(dy)) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	_moveY(dy) {
		if (this._commands.length === 0) {
			return false
		}

		for (const cmd of this._commands) {
			cmd.moveY(dy)
		}

		return true
	}

	// Moves the path on the X and Y plane by dx and dy,
	// each may be negative.
	move(dx, dy) {
		const movedX = this._moveX(dx)
		const movedY = this._moveY(dy)

		if (movedX || movedY) {
			this.updateElement()
			this.updated()
		}

		return this
	}

	// Updates the element's 'd' attribute with any changes.
	// Done automatically when a command is added, modified,
	// or removed.
	updateElement() {
		this.attr('d', this.toString())
	}

	// Returns true if the passed command is in the path.
	containsCommand(cmd) {
		return this._commands.includes(cmd)
	}

	// Returns a space separated list of stringified commands
	// suitable for applying as the 'd' attribute of an SVG
	// Path.
	toString() {
		return this._commands
			.map((cmd) => cmd.toString()) //
			.join(' ') //
	}

	_generateElement() {
		const path = document.createElementNS(NAME_SPACE, 'path')
		this._setElement(path)
		this.updateElement()
		this.updated()
	}

	_addCmd(cmd) {
		const cmds = this._commands

		if (this._closed) {
			cmds.insertBefore(cmds.last(), cmd)
		} else {
			cmds.push(cmd)
		}

		cmd.onUpdate(this.notifier)
	}

	_removeCmd(cmd) {
		if (!this._commands.includes(cmd)) {
			return false
		}

		cmd.offUpdate(this.notifier)
		this._commands.remove(cmd)

		return true
	}

	_close() {
		if (this._closed) {
			return false
		}

		this._addCmd(Command.close())
		this._closed = true

		return true
	}

	_open() {
		if (!this._closed) {
			return false
		}

		this._closed = false
		this._commands.pop()

		return true
	}
}
