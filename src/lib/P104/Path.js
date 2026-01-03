import { NAME_SPACE, boundsOfCoords } from './cheddar.js'
import List from './List.js'
import Elemental from './Elemental.js'
import Command from './Command.js'
import BBox from './BBox.js'

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
	_bbox = new BBox()
	_onUpdateElement = this.updateElement.bind(this)

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

	get firstCommand() {
		if (this._commands.length > 0) {
			return this._commands[0]
		}
		return null
	}

	get lastCommand() {
		if (this._commands.length > 0) {
			return this._commands[this._commands.length - 1]
		}
		return null
	}

	get closed() {
		return this._closed
	}

	set closed(v) {
		v ? this.close() : this.open()
		return this._closed
	}

	// Returns a bounding box around the path, excluding
	// any control points.
	//
	// Due to current SVG stroke mechanics, the stroke may
	// not be visually contained within the box.
	//
	// You can receive notifications to box changes, but
	// notifications are one way, i.e. changing box values
	// does nothing and will be overwritten on next update.
	get bbox() {
		return this._bbox
	}

	// Append a command to the path.
	addCommand(cmd) {
		this._addCmd(cmd)
		this.updateElement()
		return this
	}

	// Remove a command from the path.
	removeCommand(cmd) {
		if (this._removeCmd(cmd)) {
			this.updateElement()
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
		}

		return this
	}

	// Creates a new move command to {x,y}.
	moveTo(x, y) {
		this._addCmd(Command.moveBy(x, y))
		this.updateElement()
		return this
	}

	// Creates a new line command to {x,y}.
	lineTo(x, y) {
		this._addCmd(Command.line(x, y))
		this.updateElement()
		return this
	}

	// Creates a new line to the first commands X and Y
	// values.
	lineToClose() {
		const { x, y } = this.commands[0]
		this._addCmd(Command.line(x, y))
		this._close()
		this.updateElement()
		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending at {x,y}.
	quadraticTo(cp1X, cp1Y, x, y) {
		const cmd = Command.quadratic(cp1X, cp1Y, x, y)
		this._addCmd(cmd)
		this.updateElement()
		return this
	}

	// Creates a quadratic curve via the {cp1X,cp1Y}
	// and ending the X and Y point of the first command.
	quadraticToClose(cp1X, cp1Y) {
		const { x, y } = this.commands[0]
		this._addCmd(Command.quadratic(cp1X, cp1Y, x, y))
		this._close()
		this.updateElement()
		return this
	}

	// Creates a cubic curve via the {cp1X,cp1Y} and
	// {cp2X,cp2Y} to {x,y}.
	cubicTo(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		const cmd = Command.cubic(cp1X, cp1Y, cp2X, cp2Y, x, y)
		this._addCmd(cmd)
		this.updateElement()
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
		return this
	}

	// Create a close command and append it to the path. All
	// commands added after will be inserted before the close
	// command.
	close() {
		if (this._close()) {
			this.updateElement()
		}

		return this
	}

	// Removes the close command from the end of the command
	// list, if it exists.
	open() {
		if (this._open()) {
			this.updateElement()
		}

		return this
	}

	// Moves the path on the X and Y plane by dx and dy,
	// each may be negative.
	moveBy(dx, dy) {
		if (this._moveBy(dx, dy)) {
			this.updateElement()
		}

		return this
	}

	_moveBy(dx, dy) {
		if (this._commands.length === 0) {
			return false
		}

		this.doMuted(() => {
			for (const cmd of this._commands) {
				cmd.moveBy(dx, dy)
			}
		})

		return true
	}

	// Grows the path by the passed factor and origin coords.
	//
	// This does not apply a transform, It scales by directly
	// adjusting the values defining the shape. This is why
	// the function is not called 'scaleBy'.
	growBy(factor, originX, originY) {
		function scale(coord, origin) {
			return (coord - origin) * factor + origin
		}

		this.doMuted(() => {
			for (const cmd of this._commands) {
				cmd.setXY(scale(cmd.x, originX), scale(cmd.y, originY))
			}
		})

		this.updateElement()
		return this
	}

	// Shrinks the path by the passed factor and origin
	// coords.
	shrinkBy(factor, originX, originY) {
		factor = 1 / factor

		function scale(coord, origin) {
			return (coord - origin) * factor + origin
		}

		this.doMuted(() => {
			for (const cmd of this._commands) {
				cmd.setXY(
					scale(cmd.x, originX), //
					scale(cmd.y, originY) //
				)
			}
		})

		this.updateElement()
		return this
	}

	// Returns true if the passed command is in the path.
	containsCommand(cmd) {
		return this._commands.includes(cmd)
	}

	// Returns a depp copy of the path.
	clone() {
		const newPath = new Path()

		for (const cmd of this._commands) {
			const copyOfCmd = new Command(...cmd.params)
			newPath._addCmd(copyOfCmd)
		}

		newPath.updateElement()
		return newPath
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
	}

	// Updates the element's 'd' attribute with any changes.
	// Done automatically when a command is added, modified,
	// or removed.
	updateElement() {
		this.doUpdate(() => {
			this.attr('d', this.toString())
			this._updateBBox()
		})
	}

	_updateBBox() {
		if (this._commands.length === 0) {
			this.bbox.setEdges(0, 0, 0, 0)
			return
		}

		const bounds = boundsOfCoords(this._commands)
		this.bbox.setEdges(
			bounds.left, //
			bounds.top, //
			bounds.right, //
			bounds.bottom //
		)
	}

	_addCmd(cmd) {
		const cmds = this._commands

		if (this._closed) {
			cmds.insertBefore(cmds.last(), cmd)
		} else {
			cmds.push(cmd)
		}

		cmd.onUpdate(this._onUpdateElement)
	}

	_removeCmd(cmd) {
		if (!this._commands.includes(cmd)) {
			return false
		}

		cmd.offUpdate(this._onUpdateElement)
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
