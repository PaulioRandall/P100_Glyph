import { Two } from '$ramen'
import PathRenderer from './PathRenderer.js'
import Path from './Path.js'

export default class PathBuilder extends PathRenderer {
	_cursor = null

	constructor(canvas, cell) {
		super(canvas)

		this.moveCursorTo(cell)
		this.moveTo(cell, true)
	}

	get cursor() {
		return this._cursor
	}

	moveCursorTo(cell) {
		this._cursor = cell

		if (this.shape) {
			const { x, y } = cell
			this._cursorVertex().set(x, y)
		}
	}

	moveTo(cell, ignoreDuplicate = false) {
		if (!ignoreDuplicate && this.isDuplicatePoint(cell)) {
			return
		}

		const cmd = makeMoveCommand(cell)
		this._commands.push(cmd)
		this.updateShape()
	}

	lineTo(cell, ignoreDuplicate = false) {
		if (!ignoreDuplicate && this.isDuplicatePoint(cell)) {
			return
		}

		const cmd = makeLineCommand(cell)
		this._commands.push(cmd)
		this.updateShape()
	}

	removeLastCommand() {
		this._commands.pop()
		this.updateShape()
	}

	// Is the cell the same as the last command's cell?
	isDuplicatePoint(cell) {
		return this._last().to === cell
	}

	// End point is the same as the start point.
	isImplicitlyClosed() {
		return this._first().to === this._last().to
	}

	isEmpty() {
		return this._commands.length < 1
	}

	hasEnoughPoints() {
		return this._commands.length > 1
	}

	build() {
		let closed = false

		if (this.isImplicitlyClosed()) {
			this.removeLastCommand()
			closed = true
		}

		if (this.hasEnoughPoints()) {
			return new Path(this.canvas, this._commands, closed)
		}

		return null
	}

	updateShape() {
		super.updateShape()

		const cursorVertex = PathRenderer.makeVertex({
			type: 'line',
			to: this._cursor,
		})

		this.shape.vertices.push(cursorVertex)
	}

	_first() {
		return this._commands[0]
	}

	_last() {
		const lastIndex = this._commands.length - 1
		return this._commands[lastIndex]
	}

	_cursorVertex() {
		const lastIndex = this.shape.vertices.length - 1
		return this.shape.vertices[lastIndex]
	}
}

function makeMoveCommand(to) {
	return {
		type: 'move',
		to,
	}
}

function makeLineCommand(to) {
	return {
		type: 'line',
		to,
	}
}
