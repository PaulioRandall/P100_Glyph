import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import List from './List.js'
import PathCommand from './PathCommand.js'

export default class Path extends Updateable {
	_commands = new List()
	_element = createElement(this._commands)
	_closed = false

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

	addCommand(cmd) {
		if (this._closed) {
			this._commands.insertBefore(this._commands.last(), cmd)
		} else {
			this._commands.push(cmd)
		}

		this.update()
	}

	replaceCommand() {
		// TODO: Test first
	}

	moveTo(x, y) {
		this.addCommand(PathCommand.move(x, y))
	}

	lineTo(x, y) {
		this.addCommand(PathCommand.line(x, y))
	}

	quadCurveTo(cp1X, cp1Y, x, y) {
		this.addCommand(PathCommand.quadCurve(cp1X, cp1Y, x, y))
	}

	cubicCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		this.addCommand(PathCommand.cubicCurve(cp1X, cp1Y, cp2X, cp2Y, x, y))
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
