import Cheddar from '$cheddar'

export default class Grid extends Cheddar.Group {
	_size = 9
	_cellWidth = 20
	_cellHeight = 20

	size(v = undefined) {
		if (v === undefined) {
			return this._size
		}

		this._size = v
		this.updated()
		return this
	}

	cellWidth(v = undefined) {
		if (v === undefined) {
			return this._cellWidth
		}

		this._cellWidth = v
		this.updated()
		return this
	}

	cellHeight(v = undefined) {
		if (v === undefined) {
			return this._cellHeight
		}

		this._cellHeight = v
		this.updated()
		return this
	}

	updated() {
		// TODO
	}

	_updateCells() {
		this.clear()

		// TODO
	}
}
/*
function createGridCells(size, cellWidth, cellHeight) {
	const canvasLength = Math.min(super.width, super.height)
	const size = this._gridSize
	const cellSpacing = canvasLength / (size - 1)

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			this._cells.add(
				new GridCell(col, row, size, cellSpacing) //
			)
		}
	}
}
*/
