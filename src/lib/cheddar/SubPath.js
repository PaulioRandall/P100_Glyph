import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'

// A SubPath represents a visual line of a Path.
//
// They are exposed by the Path to allow manipulation of
// its commands in a way that an end user will often
// percieve it, i.e. as a line between two points in which
// either point can be moved, the line straightened or
// curved, the line remove, etc.
//
// Because the visual line drawn by a command is
// influenced by the command before or after it,
// a SubPath does not represent a single command, per se.
// However, there is core command that determines the shape
// of the drawn line. It is returned by the command getter.
export default class SubPath extends Updateable {
	_path = null
	_cmd = null

	// This class is designed to be instantiated internally,
	// but it is possible to create one yourself. You don't
	// need to though. Each Path keeps an updated list of
	// SubPaths accessible through its 'subPaths' getter.
	constructor(path, cmd) {
		super()

		this._path = path
		this._cmd = cmd
	}

	// Gets the Path which the SubPath was produced by.
	get path() {
		return this._path
	}

	// Returns the command that draws the SubPath (or line
	// between path nodes).
	get command() {
		return this._cmd
	}

	// Returns the command containing the x,y point where the
	// SubPath starts.
	//
	// This always be the command before the SubPath's
	// command.
	get startCommand() {
		return this._path.commands.itemBefore(this._cmd)
	}

	// Returns the command containing the x,y point where the
	// SubPath ends.
	//
	// This always the same as the SubPath's command except
	// for close commands, type 'Z', which will return the
	// Path's initial move command.
	get endCommand() {
		if (this._cmd.type === 'Z') {
			return this._path.commands[0]
		}
		return this._cmd
	}

	// Returns true if the SubPath is still valid and calls
	// to methods that manipulate the path can be made.
	//
	// If the core command is replaced, in the parent Path,
	// by a method here, this SubPath's command will be
	// updated accordingly so the SubPath remains valid.
	//
	// Removing the SubPath or if it's core command is
	// replaced by an operation external to this SubPath will
	// invalidate this SubPath.
	inPath() {
		return this._path.containsCommand(this._cmd)
	}

	// Sets the start point.
	setStart(x, y) {
		if (!this.inPath()) {
			throw new Error('SubPath no longer part of its Path')
		}

		const currCmd = this.startCommand
		const newCmd = currCmd.withXY(x, y)
		this._path.commands.replace(currCmd, newCmd)

		this.update()
		return this
	}

	// Sets the end point.
	setEnd(x, y) {
		if (!this.inPath()) {
			throw new Error('SubPath no longer part of its Path')
		}

		const currCmd = this.endCommand
		const newCmd = currCmd.withXY(x, y)
		this._path.commands.replace(currCmd, newCmd)

		if (currCmd === this._cmd) {
			this._cmd = newCmd
		}

		this.update()
		return this
	}

	straighten() {
		if (!this.inPath()) {
			throw new Error('SubPath no longer part of its Path')
		}

		if (this._cmd.type === 'L' || this._cmd.type === 'Z') {
			return this
		}

		const endCmd = this.endCommand
		const newCmd = Command.line(endCmd.x, endCmd.y)
		this._path.commands.replace(this._cmd, newCmd)

		this.update()
		return this
	}

	curve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		if (!this.inPath()) {
			throw new Error('SubPath no longer part of its Path')
		}

		if (cp1X === null) {
			this.straighten()
			return this
		}

		if (cp2X === null) {
			this._convertToQuadrate(cp1X, cp1Y)
			return this
		}

		this._convertToCubic(cp1X, cp1Y, cp2X, cp2Y)
		return this
	}

	_convertToQuadrate(cpX, cpY) {
		const endCmd = this.endCommand
		const newCmd = Command.quadratic(
			cpX,
			cpY, //
			endCmd.x,
			endCmd.y //
		)

		if (this._cmd.type === 'Z') {
			this._path.commands.insertBefore(this._cmd, newCmd)
		} else {
			this._path.commands.replace(this._cmd, newCmd)
		}

		this.update()
	}

	_convertToCubic(cp1X, cp1Y, cp2X, cp2Y) {
		const endCmd = this.endCommand
		const newCmd = Command.cubic(
			cp1X,
			cp1Y, //
			cp2X,
			cp2Y, //
			endCmd.x,
			endCmd.y //
		)

		if (this._cmd.type === 'Z') {
			this._path.commands.insertBefore(this._cmd, newCmd)
		} else {
			this._path.commands.replace(this._cmd, newCmd)
		}

		this.update()
	}
}

function toPoint(cmd) {
	return {
		x: cmd.x,
		y: cmd.y,
	}
}
