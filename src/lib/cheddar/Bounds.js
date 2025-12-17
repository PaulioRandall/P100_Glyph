import Updateable from './Updateable.js'

// Represents a bounding box on a 2D plane.
//
// Bounds work with intergers only.
export default class Bounds extends Updateable {
	_left = 0
	_top = 0
	_right = 100
	_bottom = 100

	_width = 100
	_height = 100
	_halfWidth = 50
	_halfHeight = 50

	_centerX = 50
	_centerY = 50

	get left() {
		return this._left
	}

	get right() {
		return this._right
	}

	get top() {
		return this._top
	}

	get bottom() {
		return this._bottom
	}

	get width() {
		return this._width
	}

	get height() {
		return this._height
	}

	get halfWidth() {
		return this._halfWidth
	}

	get halfHeight() {
		return this._halfHeight
	}

	get centerX() {
		return this._centerX
	}

	get centerY() {
		return this._centerY
	}

	setLeft(v) {
		this._left = Math.round(v)
		this.update()
		return this
	}

	setRight(v) {
		this._right = Math.round(v)
		this.update()
		return this
	}

	setTop(v) {
		this._top = Math.round(v)
		this.update()
		return this
	}

	setBottom(v) {
		this._bottom = Math.round(v)
		this.update()
		return this
	}

	setWidth(w) {
		w = Math.round(w)
		const diff = w - this._width
		const half = Math.round(diff / 2)

		this._left -= half
		this._right = this._left + w

		this.update()
	}

	setHeight(h) {
		h = Math.round(h)
		const diff = h - this._height
		const half = Math.round(diff / 2)

		this._top -= half
		this._bottom = this._top + h

		this.update()
	}

	setWidthFromLeft(w) {
		this._right = this._left + w
		this.update()
		return this
	}

	setWidthFromRight(w) {
		this._left = this._right - w
		this.update()
		return this
	}

	setHeightFromTop(h) {
		this._bottom = this._top + h
		this.update()
		return this
	}

	setHeightFromBottom(h) {
		this._top = this._bottom - h
		this.update()
		return this
	}

	set(left, top, right, bottom) {
		this._left = Math.round(left)
		this._top = Math.round(top)
		this._right = Math.round(right)
		this._bottom = Math.round(bottom)
		this.update()
		return this
	}

	// Override
	update() {
		this._width = this._right - this._left
		this._height = this._bottom - this._top
		this._halfWidth = Math.round(this._width / 2)
		this._halfHeight = Math.round(this._height / 2)
		this._centerX = calcCenter(this._left, this._right)
		this._centerY = calcCenter(this._top, this._bottom)
		super.update()
	}

	// Returns true if the coords lay within or on the edge
	// of the bounds.
	contains(x, y) {
		x = Math.round(x)
		y = Math.round(y)

		return (
			x >= this._left && //
			x <= this._right && //
			y >= this._top && //
			y <= this._bottom
		)
	}

	// Returns true if the coords lay within the bounds. Will
	// return false if on the edge.
	containsWithin(x, y) {
		x = Math.round(x)
		y = Math.round(y)

		return (
			x > this._left && //
			x < this._right && //
			y > this._top && //
			y < this._bottom
		)
	}

	toString() {
		return [
			this._left, //
			this._top, //
			this._right, //
			this._bottom, //
		].join(' ')
	}
}

function calcCenter(min, max) {
	return Math.round(max - (max - min) / 2)
}
