import Updateable from './Updateable.js'

// Represents a bounding box or viewbox on a 2D plane.
//
// Unlike Elemental classes, the values are kept in sync;
// a call to the update function won't do anything other
// than notify listeners.
//
// TODO: rename 'set...' functions to 'moveTo' and
//       'move...' functions to 'moveBy'.
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
		this.updated()
		return this
	}

	// Individually set the right value without influencing
	// other values.
	setRight(v) {
		this._right = v
		this._updateWidth()
		this._updateCenterX()
		this.updated()
		return this
	}

	// Individually set the top value without influencing
	// other values.
	setTop(v) {
		this._top = v
		this._updateHeight()
		this._updateCenterY()
		this.updated()
		return this
	}

	// Individually set the bottom value without influencing
	// other values.
	setBottom(v) {
		this._bottom = v
		this._updateHeight()
		this._updateCenterY()
		this.updated()
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

		this.updated()
		return this
	}

	// Sets center X adjusting left and right accordingly.
	setCenterX(cx) {
		this._centerX(cx)
		this.updated()
		return this
	}

	_centerX(cx) {
		const half = this._w / 2
		this._cx = cx
		this._left = cx - half
		this._right = cx + half
	}

	// Sets center Y adjusting top and bottom accordingly.
	setCenterY(cy) {
		this._centerY(cy)
		this.updated()
		return this
	}

	_centerY(cy) {
		const half = this._h / 2
		this._cy = cy
		this._top = cy - half
		this._bottom = cy + half
	}

	// Sets center adjusting all edges accordingly.
	setCenter(cx, cy) {
		this._centerX(cx)
		this._centerY(cy)
		this.updated()
		return this
	}

	// Sets the width by forcing the right value to grow or
	// shrink to accommodate.
	setWidthAnchorLeft(w) {
		this._w = w
		this._right = this._left + w
		this._updateCenterX()

		this.updated()
		return this
	}

	// Sets the width and forces the left and right values to
	// grow or shrink by the same amount to accommodate.
	setWidthAnchorCenter(w) {
		this._setWidthAnchorCenter(w)
		this.updated()
		return this
	}

	_setWidthAnchorCenter(w) {
		this._w = w
		this._left = this._cx - w / 2
		this._right = this._left + w
		this._updateCenterX()
	}

	// Sets the width by forcing the left value to grow or
	// shrink to accommodate.
	setWidthAnchorRight(w) {
		this._w = w
		this._left = this._right - w
		this._updateCenterX()

		this.updated()
		return this
	}

	// Sets the height by forcing the bottom value to grow or
	// shrink to accommodate.
	setHeightAnchorTop(h) {
		this._h = h
		this._bottom = this._top + h
		this._updateCenterY()

		this.updated()
		return this
	}

	// Sets the height and forces the top and bottom values
	// to grow or shrink by the same amount to accommodate.
	setHeightAnchorCenter(h) {
		this._setHeightAnchorCenter(h)
		this.updated()
		return this
	}

	_setHeightAnchorCenter(h) {
		this._h = h
		this._top = this._cy - h / 2
		this._bottom = this._top + h
		this._updateCenterY()
	}

	// Sets the height by forcing the top value to grow or
	// shrink to accommodate.
	setHeightAnchorBottom(h) {
		this._h = h
		this._top = this._bottom - h
		this._updateCenterY()

		this.updated()
		return this
	}

	// Moves the box on the X and Y plane by dx and dy,
	// each may be negative.
	moveBy(dx, dy) {
		if (dx !== 0) {
			this._moveX(dx)
		}

		if (dy !== 0) {
			this._moveY(dy)
		}

		this.updated()
		return this
	}

	_moveX(dx) {
		this._left += dx
		this._right += dx
		this._updateCenterX()
	}

	_moveY(dy) {
		this._top += dy
		this._bottom += dy
		this._updateCenterY()
	}

	// Grows the box by the passed factor, anchored on the
	// center. Negative values shrink the box.
	//
	// This does not apply a transform, It scales by directly
	// adjusting the values defining the shape. This is why
	// the function is not called 'scale'.
	//
	// TODO: Allow user to pass in origin coords.
	growBy(factor) {
		this._setWidthAnchorCenter(this._w + factor)
		this._setHeightAnchorCenter(this._h + factor)
		this.updated()
		return this
	}

	// Resizes the box to match the inner width and height
	// of the browser window.
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
