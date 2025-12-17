import Updateable from './Updateable.js'

// TODO: Throw if not 'inPath' on get or set?

export default class Line extends Updateable {
	_path = null
	_cmd = null

	constructor(path, cmd) {
		super()

		this._path = path
		this._cmd = cmd
	}

	get command() {
		return this._cmd
	}

	get start() {
		if (!this.inPath()) {
			return null
		}

		return toPoint(getStartCommand(this._path, this._cmd))
	}

	get end() {
		if (!this.inPath()) {
			return null
		}

		return toPoint(getEndCommand(this._path, this._cmd))
	}

	inPath() {
		return this._path.containsCommand(this._cmd)
	}

	setStart(x, y) {
		if (!this.inPath()) {
			return
		}

		const currCmd = getStartCommand(this._path, this._cmd)
		const newCmd = currCmd.withXY(x, y)
		this._path.commands.replace(currCmd, newCmd)

		this.update()
	}

	setEnd(x, y) {
		if (!this.inPath()) {
			return
		}

		const currCmd = getEndCommand(this._path, this._cmd)
		const newCmd = currCmd.withXY(x, y)
		this._path.commands.replace(currCmd, newCmd)

		if (currCmd === this._cmd) {
			this._cmd = newCmd
		}

		this.update()
	}

	setCurve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		// TODO: set type to 'Q' or 'C'
		// TODO: set cp1X to cpX, set cp1Y to cpY
		// TODO: if either is null, set to cmd's X or Y coord

		this.update()
	}
}

function toPoint(cmd) {
	return {
		x: cmd.x,
		y: cmd.y,
	}
}

function getStartCommand(path, cmd) {
	// For any valid subpath, there will always be a prior
	// command.
	return path.commands.itemBefore(cmd)
}

function getEndCommand(path, cmd) {
	if (cmd.type === 'Z') {
		return path.commands[0]
	}
	return cmd
}
