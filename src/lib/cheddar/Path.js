import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

export default class Path extends Updateable {
	static startingAt(x, y) {
		return new Path().move(x, y)
	}

	_element = null
	_commands = new List()
	_subPaths = new List()
	_closed = false

	constructor() {
		super()

		this._element = createElement(this._commands)
		this.update()
	}

	get commands() {
		return this._commands
	}

	get element() {
		return this._element
	}

	get subPaths() {
		return this._subPaths
	}

	get isClosed() {
		return this._closed
	}

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

	update() {
		this._element.setAttribute('d', this.toString())
		updateSubPaths(this)
		super.update()
	}

	toString() {
		return this._commands
			.map((cmd) => cmd.toString()) //
			.join(' ') //
	}
}

function createElement(commands) {
	const path = document.createElementNS(NAME_SPACE, 'path')
	const textCmds = commands.map((cmd) => cmd.toString())

	path.setAttribute('d', textCmds.join(' '))
	path.setAttribute('stroke', 'black')
	path.setAttribute('fill', 'none')

	return path
}

function updateSubPaths(path) {
	path._subPaths.clear()

	for (const cmd of path.commands) {
		if (cmd.type !== 'M' && cmd.type !== 'Z') {
			const sp = new SubPath(path, cmd)
			sp.onUpdate(path.update.bind(path))
			path._subPaths.push(sp)
		}
	}
}
