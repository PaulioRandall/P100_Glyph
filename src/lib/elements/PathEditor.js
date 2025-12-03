import BasePath from './BasePath.js'

export default class PathEditor extends BasePath {
	_path = null

	constructor(canvas, path) {
		super(canvas, path.commands, path.closed)

		this._path = path
	}

	get path() {
		return this._path
	}

	__group__added() {
		this.canvas.editMode()
		this._path.visible = false
	}

	__group__removed() {
		this._path.visible = true
		this.canvas.idleMode()
	}

	setClosed(v) {
		this._path.closed = v
		this.closed = v
		this.updateShape()
	}

	updateShape() {
		super.updateShape()
		this.updateColor('blue')
	}
}
