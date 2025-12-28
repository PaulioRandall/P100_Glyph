import Updateable from './Updateable.js'

// Represents a bounding box or viewbox on a 2D plane.
//
// Unlike Elemental classes, the values are kept in sync;
// a call to the update function won't do anything other
// than notify listeners.
export default class BBox extends Updateable {
	_left = 0
	_top = 0
	_right = 100
	_bottom = 100

	_w = 100
	_h = 100

	_cx = 50
	_cy = 50

	get left() {
		return this._left
	}

	get top() {
		return this._top
	}

	get right() {
		return this._right
	}

	get bottom() {
		return this._bottom
	}

	get width() {
		return this._w
	}

	get height() {
		return this._h
	}

	get centerX() {
		return this._cx
	}

	get centerY() {
		return this._cy
	}

	// Individually set the left value without influencing
	// other values.
	setLeft(v) {
		this._left = v
		this._updateWidth()
		this._updateCenterX()
		this.update()
		return this
	}

	// Individually set the right value without influencing
	// other values.
	setRight(v) {
		this._right = v
		this._updateWidth()
		this._updateCenterX()
		this.update()
		return this
	}

	// Individually set the top value without influencing
	// other values.
	setTop(v) {
		this._top = v
		this._updateHeight()
		this._updateCenterY()
		this.update()
		return this
	}

	// Individually set the bottom value without influencing
	// other values.
	setBottom(v) {
		this._bottom = v
		this._updateHeight()
		this._updateCenterY()
		this.update()
		return this
	}

	// Sets left, top, right, and bottom together.
	setEdges(left, top, right, bottom) {
		this._left = left
		this._top = top
		this._right = right
		this._bottom = bottom

		this._updateWidth()
		this._updateHeight()
		this._updateCenterX()
		this._updateCenterY()

		this.update()
		return this
	}

	// Sets center X adjusting left and right accordingly.
	setCenterX(cx) {
		const half = this._w / 2
		this._cx = cx
		this._left = cx - half
		this._right = cx + half

		this.update()
		return this
	}

	// Sets center Y adjusting top and bottom accordingly.
	setCenterY(cy) {
		const half = this._h / 2
		this._cy = cy
		this._top = cy - half
		this._bottom = cy + half

		this.update()
		return this
	}

	// TODO: setCenter(x,y)

	// Sets the width by forcing the right value to grow or
	// shrink to accommodate.
	setWidthAnchorLeft(w) {
		this._w = w
		this._right = this._left + w
		this._updateCenterX()

		this.update()
		return this
	}

	// Sets the width and forces the left and right values to
	// grow or shrink by the same amount to accommodate.
	setWidthAnchorCenter(w) {
		this._w = w
		this._left = this._cx - w / 2
		this._right = this._left + w
		this._updateCenterX()

		this.update()
		return this
	}

	// Sets the width by forcing the left value to grow or
	// shrink to accommodate.
	setWidthAnchorRight(w) {
		this._w = w
		this._left = this._right - w
		this._updateCenterX()

		this.update()
		return this
	}

	// Sets the height by forcing the bottom value to grow or
	// shrink to accommodate.
	setHeightAnchorTop(h) {
		this._h = h
		this._bottom = this._top + h
		this._updateCenterY()

		this.update()
		return this
	}

	// Sets the height and forces the top and bottom values
	// to grow or shrink by the same amount to accommodate.
	setHeightAnchorCenter(h) {
		this._h = h
		this._top = this._cy - h / 2
		this._bottom = this._top + h
		this._updateCenterY()

		this.update()
		return this
	}

	// Sets the height by forcing the top value to grow or
	// shrink to accommodate.
	setHeightAnchorBottom(h) {
		this._h = h
		this._top = this._bottom - h
		this._updateCenterY()

		this.update()
		return this
	}

	// Moves the box on the X plane by dx, which may be
	// negative.
	moveX(dx) {
		this._left += dx
		this._right += dx
		this._updateCenterX()

		this.update()
		return this
	}

	// Moves the box on the Y plane by dy, which may be
	// negative.
	moveY(dy) {
		this._top += dy
		this._bottom += dy
		this._updateCenterY()

		this.update()
		return this
	}

	// TODO: move(x,y)

	sizeToWindow() {
		this.setEdges(0, 0, window.innerWidth, window.innerHeight)
		return this
	}

	// Returns true if the coords lay within or on the edge
	// of the box.
	contains(x, y) {
		return (
			x >= this._left && //
			x <= this._right && //
			y >= this._top && //
			y <= this._bottom
		)
	}

	// Returns true if the coords lay within the box. Will
	// return false if on the edge.
	containsWithin(x, y) {
		return (
			x > this._left && //
			x < this._right && //
			y > this._top && //
			y < this._bottom
		)
	}

	// Returns a string representing the box in
	// `left top right bottom` format.
	toString() {
		return [
			this._left, //
			this._top, //
			this._right, //
			this._bottom, //
		].join(' ')
	}

	// Returns a string suitable for setting SVG viewbox.
	toViewboxString() {
		return [
			this._left, //
			this._top, //
			this._w, //
			this._h, //
		].join(' ')
	}

	_updateWidth() {
		this._w = this._right - this._left
	}

	_updateHeight() {
		this._h = this._bottom - this._top
	}

	_updateCenterX() {
		this._cx = calcCenter(this._left, this._right)
	}

	_updateCenterY() {
		this._cy = calcCenter(this._top, this._bottom)
	}
}

function calcCenter(min, max) {
	return max - (max - min) / 2
}
