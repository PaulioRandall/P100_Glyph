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
//
// TODO: Allow initial x,y values to be passed on
//       construction.
export default class Path extends Elemental {
	_commands = new List()
	_subPaths = new List()
	_closed = false

	constructor() {
		super()

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

	// TODO: Rename to 'contains'?
	containsCommand(cmd) {
		return this._commands.includes(cmd)
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

	moveTo(x, y) {
		const cmd = Command.move(x, y)
		this.addCommand(cmd)
		return this
	}

	lineTo(x, y) {
		const cmd = Command.line(x, y)
		this.addCommand(cmd)
		return this
	}

	lineToClose() {
		const { x, y } = this.commands[0]

		const cmd = Command.line(x, y)
		this.nuAddCommand(cmd).close()

		return this
	}

	quadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.addCommand(cmd)
		return this
	}

	quadraticToClose(cp1X, cp1Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.nuAddCommand(cmd).close()

		return this
	}

	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.addCommand(cmd)
		return this
	}

	cubicToClose(cp1X, cp1Y, cp2X, cp2Y) {
		const { x, y } = this.commands[0]

		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.nuAddCommand(cmd).close()

		return this
	}

	close() {
		if (this._closed) {
			return
		}

		this.addCommand(Command.close())
		this._closed = true
		this.update()

		return this
	}

	open() {
		if (!this._closed) {
			return
		}

		this._closed = false
		this._commands.pop()
		this.update()

		return this
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
