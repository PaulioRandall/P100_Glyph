import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import List from './List.js'
import PathCommand from './PathCommand.js'

export default class Path extends Updateable {
	_commands = new List()
	_closed = false
	_element = createElement(this._commands)
	_subPaths = new List()

	constructor() {
		super()
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
		return cmd
	}

	replaceCommand(currCmd, newCmd) {
		this._commands.replace(currCmd, newCmd)
	}

	moveTo(x, y) {
		const cmd = PathCommand.move(x, y)
		return this.addCommand(cmd)
	}

	lineTo(x, y) {
		const cmd = PathCommand.line(x, y)
		return this.addCommand(cmd)
	}

	quadCurveTo(cp1X, cp1Y, x, y) {
		const cmd = PathCommand.quadCurve(cp1X, cp1Y, x, y)
		return this.addCommand(cmd)
	}

	cubicCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = PathCommand.cubicCurve(cp1X, cp1Y, cp2X, cp2Y, x, y)
		return this.addCommand(cmd)
	}

	close() {
		if (this._closed) {
			return
		}

		this.addCommand(PathCommand.close())
		this._closed = true
		this.update()
	}

	open() {
		if (!this._closed) {
			return
		}

		this._closed = false
		this._commands.pop()
		this.update()
	}

	update() {
		this.element.setAttribute('d', this.toString())
		super.update()
	}

	toString() {
		return this._commands.map((cmd) => cmd.toString()).join(' ')
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
