import Cheddar from '$cheddar'

export default class GridPoint extends Cheddar.Circle {
	_isBufferPoint = false
	_cellbox = Cheddar.bbox()

	constructor(cx, cy, pointSize, cellSize, isBufferPoint) {
		super(cx, cy, pointSize)

		this._isBufferPoint = isBufferPoint
		this._cellbox
			.setCenterX(cx)
			.setCenterY(cy)
			.setWidth(cellSize, 'center')
			.setHeight(cellSize, 'center')

		if (isBufferPoint) {
			this.attr('stroke', 'lightgrey')
			this.attr('fill', 'lightgrey')
		} else {
			this.attr('fill', 'black')
		}
	}

	get type() {
		return this._type
	}

	get cellbox() {
		return this._cellbox
	}
}
