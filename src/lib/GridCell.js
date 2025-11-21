export default class GridCell {
	x = 0
	y = 0

	w = 0
	h = 0

	col = 0
	row = 0

	left = 0
	right = 0
	top = 0
	bottom = 0

	constructor(col, row, length) {
		this.col = col
		this.row = row
		this.length = length

		this.top = row * length
		this.left = col * length

		this.bottom = this.top + length
		this.right = this.left + length

		this.w = length
		this.h = length

		const halfLength = length / 2
		this.x = this.left + halfLength
		this.y = this.top + halfLength
	}

	contains(x, y) {
		return x > this.left && x < this.right && y > this.top && y < this.bottom
	}
}
