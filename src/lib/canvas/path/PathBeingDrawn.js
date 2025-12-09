import Path from './Path.js'

export default class PathBeingDrawn extends Path {
	get cursor() {
		return this._last()
	}

	constructor(canvas, cursor) {
		super(canvas)

		this.pushNode(cursor) // Path start position
		this.pushNode(cursor) // Cursor that user moves
	}

	moveCursorTo(cell) {
		this.popNode()
		this.pushNode(cell)
	}

	isRepeatNode(cell) {
		return this._last() === cell
	}

	isSealed() {
		return this._first() === this._last()
	}

	isEmpty() {
		return this.nodeCount < 1
	}

	isValid() {
		return this.nodeCount > 1
	}

	get() {
		if (!this.isValid()) {
			return null
		}

		const popAmount = this.isSealed() ? 2 : 1
		const geometry = this.geometry.slice(0, -popAmount)
		const styles = { closed: this.isSealed() }
		return new Path(this.canvas, geometry, styles)
	}

	_first() {
		return this.geometry[0]
	}

	_last() {
		const lastIndex = this.nodeCount - 1
		return this.geometry[lastIndex]
	}
}
