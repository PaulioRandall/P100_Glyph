import Updateable from './Updateable.js'

export default class SubPath extends Updateable {
	_path = null
	_startCmd = null
	_cmd = null
	_endCmd = null

	// 'startCmd' contains the start coords of the sub path.
	// 'cmd' is the command that draws the path.
	// 'endCmd' contains the end coords of the sub path.
	// (endCmd is the same as cmd unless cmd type is 'Z')
	//
	// TODO: Just pass cmd. find the start and end cmds when
	//       they are needed because they may change.
	constructor(path, startCmd, cmd, endCmd) {
		super()

		this._path = path
		this._startCmd = startCmd
		this._cmd = cmd
		this._endCmd = endCmd
	}

	get command() {
		return this._cmd
	}

	get start() {
		// TODO: get start from path, if null, return null
		return toPoint(this._startCmd)
	}

	get end() {
		// TODO: get end from path, if null, return null
		return toPoint(this._endCmd)
	}

	inPath() {
		return this._path.contains(this._cmd)
	}

	setStart(x, y) {
		if (!this.inPath()) {
			return
		}

		// TODO
		this.update()
	}

	setEnd(x, y) {
		if (!this.inPath()) {
			return
		}

		// TODO
		this.update()
	}

	update() {
		if (!this.inPath()) {
			return
		}

		// TODO
		super.update()
	}
}

function toPoint(cmd) {
	return {
		x: cmd.x,
		y: cmd.y,
	}
}
