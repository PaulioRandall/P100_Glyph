import { NAME_SPACE } from './cheddar.js'
import List from './List.js'
import Elemental from './Elemental.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

// TODO: Document.
//
// TODO: Implement functions to change properties such as
//       stroke, strokewidth, fill, etc. Or maybe add
//       functions to Elemental class that add and remove
//       props from the element?
//
// TODO: Implement and test remove and clear functions.
//
// TODO: Add translate functions.
export default class Path extends Elemental {
	_commands = new List()
	_subPaths = new List()
	_closed = false

	constructor(x = null, y = null) {
		super()

		if (x !== null) {
			this.nuMoveTo(x, y)
		}

		this._generateElement()
		this.update()
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

	nuAddCommand(cmd) {
		const cmds = this._commands

		if (this._closed) {
			cmds.insertBefore(cmds.last(), cmd)
		} else {
			cmds.push(cmd)
		}

		cmd.onUpdate(this.update.bind(this))

		if (cmd.type !== 'M' && cmd.type !== 'Z') {
			this._subPaths.push(new SubPath(this, cmd))
		}

		return this
	}

	addCommand(cmd) {
		this.nuAddCommand(cmd)
		this.update()
		return this
	}

	nuMoveTo(x, y) {
		const cmd = Command.move(x, y)
		this.nuAddCommand(cmd)
		return this
	}

	moveTo(x, y) {
		this.nuMoveTo(x, y)
		this.update()
		return this
	}

	nuLineTo(x, y) {
		const cmd = Command.line(x, y)
		this.nuAddCommand(cmd)
		return this
	}

	lineTo(x, y) {
		this.nuLineTo(x, y)
		this.update()
		return this
	}

	nuLineToClose() {
		const { x, y } = this.commands[0]

		const cmd = Command.line(x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	lineToClose() {
		this.nuLineToClose()
		this.update()
		return this
	}

	// TODO: Should x,y come first?
	nuQuadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.nuAddCommand(cmd)
		return this
	}

	quadraticTo(cp1X, cp1Y, x, y) {
		this.nuQuadraticTo(cp1X, cp1Y, x, y)
		this.update()
		return this
	}

	nuQuadraticToClose(cp1X, cp1Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	quadraticToClose(cp1X, cp1Y) {
		this.nuQuadraticToClose(cp1X, cp1Y)
		this.update()
		return this
	}

	nuCubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.nuAddCommand(cmd)
		return this
	}

	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		this.nuCubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.update()
		return this
	}

	nuCubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.nuAddCommand(cmd)
		this.nuClose()

		return this
	}

	cubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		this.nuCubicToClose(cp1X, cp1Y, cp2X, cp2Y)
		this.update()
		return this
	}

	nuClose() {
		if (this._closed) {
			return this
		}

		const cmd = Command.close()
		this.nuAddCommand(cmd)
		this._closed = true

		return this
	}

	close() {
		if (this._closed) {
			return this
		}

		this.nuClose()
		this.update()

		return this
	}

	nuOpen() {
		if (!this._closed) {
			return
		}

		this._closed = false
		this._commands.pop()

		return this
	}

	open() {
		if (!this._closed) {
			return this
		}

		this.nuOpen()
		this.update()

		return this
	}

	containsCommand(cmd) {
		return this._commands.includes(cmd)
	}

	toString() {
		return this._commands
			.map((cmd) => cmd.toString()) //
			.join(' ') //
	}

	update() {
		this._element.setAttribute('d', this.toString())
		super.update()
	}

	_generateElement() {
		const cmds = this._commands
		const path = document.createElementNS(NAME_SPACE, 'path')
		const textCmds = cmds.map((cmd) => cmd.toString())

		path.setAttribute('d', textCmds.join(' '))
		path.setAttribute('stroke', 'black')
		path.setAttribute('fill', 'none')

		this._setElement(path)
	}
}
