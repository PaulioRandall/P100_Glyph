import Updateable from './Updateable.js'

// TODO: Throw if not 'inPath' on get or set?

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
		this._path.replaceCommand(currCmd, newCmd)

		this.update()
	}

	setEnd(x, y) {
		if (!this.inPath()) {
			return
		}

		const currCmd = getEndCommand(this._path, this._cmd)
		const newCmd = currCmd.withXY(x, y)
		this._path.replaceCommand(currCmd, newCmd)

		if (currCmd === this._cmd) {
			this._cmd = newCmd
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
