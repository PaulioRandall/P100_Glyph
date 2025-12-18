import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'

export default class SubPath extends Updateable {
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

	straighten() {
		if (this._cmd.type === 'L' || this._cmd.type === 'Z') {
			return
		}

		const endCmd = getEndCommand(this._path, this._cmd)
		const newCmd = Command.line(endCmd.x, endCmd.y)
		this._path.commands.replace(this._cmd, newCmd)

		this.update()
	}

	convertToQuadratic(cpX, cpY) {
		const endCmd = getEndCommand(this._path, this._cmd)
		const newCmd = Command.quadCurve(
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

	convertToCubic(cp1X, cp1Y, cp2X, cp2Y) {
		const endCmd = getEndCommand(this._path, this._cmd)
		const newCmd = Command.cubicCurve(
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
