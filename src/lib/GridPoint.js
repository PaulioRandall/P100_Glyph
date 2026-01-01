import Cheddar from '$cheddar'

export default class GridPoint extends Cheddar.Circle {
	_isBufferPoint = false

	constructor(cx, cy, pointSize, isBufferPoint) {
		super(cx, cy, pointSize)

		this._isBufferPoint = isBufferPoint

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
}
