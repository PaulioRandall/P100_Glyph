import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

// TODO: Should close command 'Z' allowed to be a sub path?

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

	addCommand(cmd) {
		const cmds = this._commands

		if (this._closed) {
			cmds.insertBefore(cmds.last(), cmd)
		} else {
			cmds.push(cmd)
		}

		cmd.onUpdate(this.update.bind(this))

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

	quadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this.addCommand(cmd)
		return this
	}

	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this.addCommand(cmd)
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
		if (cmd.type !== 'M') {
			const sp = new SubPath(path, cmd)
			sp.onUpdate(path.update.bind(path))
			path._subPaths.push(sp)
		}
	}
}
