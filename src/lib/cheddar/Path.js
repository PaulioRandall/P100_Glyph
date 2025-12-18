import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

// TODO: The current problem with SubPaths is that they
//       are recreated when the path is updated. This means
//       storing a SubPath after getting it will outdate it
//       if a method on it, or its parent Path, mutates
//       the command list in anyway.
//
//       We could keep the list of SubPaths updated instead
//       of being recreated. This means any mutation by
//       a SubPath must propogate to other SubPaths if
//       a Command is replaced.
//
//       This could be done by storing an index to the
//       SubPath's core Command within the Path's command
//       list instead of storing the core Command. Then
//       update indexes for all SubPaths if a Command is
//       added or removed (including adding or removing
//       the associated SubPath).

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
