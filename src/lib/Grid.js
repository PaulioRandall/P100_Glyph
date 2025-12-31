import Cheddar from '$cheddar'
import Embed from '$embed'

export default class Grid extends Cheddar.Group {
	_size = 9
	_cellWidth = 10
	_cellHeight = 10
	_cellSize = 1

	size(v = undefined) {
		if (v === undefined) {
			return this._size
		}

		this._size = v
		this._updateCells()
		this.updated()

		return this
	}

	cellWidth(v = undefined) {
		if (v === undefined) {
			return this._cellWidth
		}

		this._cellWidth = v
		this._updateCells()
		this.updated()

		return this
	}

	cellHeight(v = undefined) {
		if (v === undefined) {
			return this._cellHeight
		}

		this._cellHeight = v
		this._updateCells()
		this.updated()

		return this
	}

	_updateCells() {
		this.doMuted(() => {
			this.clear()

			for (let col = 0; col < this._size; col++) {
				for (let row = 0; row < this._size; row++) {
					const x = col * this._cellWidth
					const y = row * this._cellHeight
					const circle = Cheddar.circle(x, y, this._cellSize).attr(
						'fill',
						'black'
					)
					this.add(circle)
				}
			}
		})
	}
}
