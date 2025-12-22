import { NAME_SPACE } from './cheddar.js'
import List from './List.js'
import DrawnElemental from './DrawnElemental.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

// Class for drawing an SVG Path.
export default class Path extends DrawnElemental {
	_commands = new List()
	_subPaths = new List()
	_closed = false

	// Argument:
	// [0] X value for an initial move command.
	// [1] Y value for an initial move command.
	constructor(x = null, y = null) {
		super()

		this.attrs.nuPut('stroke', 'black')
		this.attrs.nuPut('fill', 'none')
		this.attrs.nuPut('d', this.toString())

		this._generateElement()

		if (x !== null) {
			this.moveTo(x, y)
		}
	}

	get commands() {
		return this._commands
	}

	get subPaths() {
		return this._subPaths
	}

	get isClosed() {
		return this._closed
	}

	// addCommand without calling update.
	nuAddCommand(cmd) {
		const cmds = this._commands

		if (this._closed) {
			cmds.insertBefore(cmds.last(), cmd)
		} else {
			cmds.push(cmd)
		}

		if (cmd.type !== 'M' && cmd.type !== 'Z') {
			const sp = new SubPath(this, cmd)
			this._subPaths.push(sp)
		}

		cmd.onUpdate(this.updater)
		return this
	}

	// Append a command to the path.
	addCommand(cmd) {
		this.nuAddCommand(cmd)
		this.update()
		return this
	}

	// removeCommand without calling update.
	nuRemoveCommand(cmd) {
		if (!this._commands.includes(cmd)) {
			return
		}

		const sp = this._subPaths.find((sp) => sp.command === cmd)
		if (sp) {
			this._subPaths.remove(sp)
		}

		cmd.offUpdate(this.updater)
		this._commands.remove(cmd)

		return this
	}

	// Remove a command from the path.
	removeCommand(cmd) {
		this.nuRemoveCommand(cmd)
		this.update()
		return this
	}

	// clear without calling update.
	nuClear() {
		for (const cmd of [...this._commands]) {
			this.nuRemoveCommand(cmd)
		}

		return this
	}

	// Removes all commadns from the path.
	clear() {
		this.nuClear()
		this.update()
		return this
	}

	// moveTo without calling update.
	nuMoveTo(x, y) {
		const cmd = Command.move(x, y)
		this.nuAddCommand(cmd)
		return this
	}

	// Creates a new move command to {x,y}.
	moveTo(x, y) {
		this.nuMoveTo(x, y)
		this.update()
		return this
	}

	// lineTo without calling update.
	nuLineTo(x, y) {
		const cmd = Command.line(x, y)
		this.nuAddCommand(cmd)
		return this
	}

	// Creates a new line command to {x,y}.
	lineTo(x, y) {
		this.nuLineTo(x, y)
		this.update()
		return this
	}

	// lineToClose without calling update.
	nuLineToClose() {
		const { x, y } = this.commands[0]

		const cmd = Command.line(x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	// Creates a new line to the first commands X and Y
	// values.
	lineToClose() {
		this.nuLineToClose()
		this.update()
		return this
	}

	// quadraticTo without calling update.
	nuQuadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.nuAddCommand(cmd)
		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending at {x,y}.
	quadraticTo(cp1X, cp1Y, x, y) {
		this.nuQuadraticTo(cp1X, cp1Y, x, y)
		this.update()
		return this
	}

	// quadraticToClose without calling update.
	nuQuadraticToClose(cp1X, cp1Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending the X and Y point of the first command.
	quadraticToClose(cp1X, cp1Y) {
		this.nuQuadraticToClose(cp1X, cp1Y)
		this.update()
		return this
	}

	// cubicToClose without calling update.
	nuCubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.nuAddCommand(cmd)
		return this
	}

	// Creates a cubic curve via the {cp1X,cp1Y} and
	// {cp2X,cp2Y} to {x,y}.
	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		this.nuCubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.update()
		return this
	}

	// cubicToClose without calling update.
	nuCubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	// Creates a cubic curve via the {cp1X,cp1Y} and
	// {cp2X,cp2Y} and ending the X and Y point of the first
	// command.
	cubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		this.nuCubicToClose(cp1X, cp1Y, cp2X, cp2Y)
		this.update()
		return this
	}

	// close without calling update.
	nuClose() {
		if (this._closed) {
			return this
		}

		const cmd = Command.close()
		this.nuAddCommand(cmd)
		this._closed = true

		return this
	}

	// Create a close command and append it to the path. All
	// commands added after will be inserted before the close
	// command.
	close() {
		if (this._closed) {
			return this
		}

		this.nuClose()
		this.update()

		return this
	}

	// open without calling update.
	nuOpen() {
		if (!this._closed) {
			return
		}

		this._closed = false
		this._commands.pop()

		return this
	}

	// Removes the close command from the end of the command
	// list, if it exists.
	open() {
		if (!this._closed) {
			return this
		}

		this.nuOpen()
		this.update()

		return this
	}

	// Always returns true.
	canTranslate() {
		return true
	}

	// translateX without calling update.
	nuTranslateX(dx) {
		for (const cmd of this._commands) {
			if (cmd.hasXY()) {
				cmd.translateX(dx)
			}
		}

		return this
	}

	// Moves the group by dx on the X plane. dx may be
	// negative.
	translateX(dx) {
		this.nuTranslateX(dx)
		this.update()
		return this
	}

	// translateY without calling update.
	nuTranslateY(dy) {
		for (const cmd of this._commands) {
			if (cmd.hasXY()) {
				cmd.translateY(dy)
			}
		}

		return this
	}

	// Moves the group by dy on the Y plane. dy may be
	// negative.
	translateY(dy) {
		this.nuTranslateY(dy)
		this.update()
		return this
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

	update() {
		this.attrs.nuPut('d', this.toString())
		super.update()
	}

	_generateElement() {
		const path = document.createElementNS(NAME_SPACE, 'path')
		this._setElement(path)
		this.update()
	}
}
