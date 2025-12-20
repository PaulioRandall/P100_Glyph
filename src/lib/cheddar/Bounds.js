import Updateable from './Updateable.js'

// Represents a bounding box on a 2D plane.
//
// Bounds work with intergers only.
//
// TODO: Create dirty flags and partial updates to deal
//       with repeated calls to 'nu' prefix functions.
//       Because these functions mutate state based upon
//       existing state, if an update has not been made
//       after a 'nu' mutation then the next function call
//       may mutate using the wrong values.
//
// TODO: Remove rounding and let numbers be free. Fixing
//       to integers can be done with a function on the
//       SVG class that user devs can program too.
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

	// setLeft without calling update.
	nuSetLeft(v) {
		this._left = Math.round(v)
		return this
	}

	// Individually set the left value without influencing
	// other values.
	setLeft(v) {
		this.nuSetLeft(v)
		this.update()
		return this
	}

	// setRight without calling update.
	nuSetRight(v) {
		this._right = Math.round(v)
		return this
	}

	// Individually set the right value without influencing
	// other values.
	setRight(v) {
		this.nuSetRight(v)
		this.update()
		return this
	}

	// setTop without calling update.
	nuSetTop(v) {
		this._top = Math.round(v)
		return this
	}

	// Individually set the top value without influencing
	// other values.
	setTop(v) {
		this.nuSetTop(v)
		this.update()
		return this
	}

	// setEdges without calling update.
	nuSetEdges(left, top, right, bottom) {
		this._left = Math.round(left)
		this._top = Math.round(top)
		this._right = Math.round(right)
		this._bottom = Math.round(bottom)
		return this
	}

	// Sets left, top, right, and bottom together.
	setEdges(left, top, right, bottom) {
		this.nuSetEdges(left, top, right, bottom)
		this.update()
		return this
	}

	// setBottom without calling update.
	nuSetBottom(v) {
		this._bottom = Math.round(v)
		return this
	}

	// Individually set the bottom value without influencing
	// other values.
	setBottom(v) {
		this.nuSetBottom(v)
		this.update()
		return this
	}

	// setCenterX without calling update.
	nuSetCenterX(x) {
		x = Math.round(x)

		this._left = x - this._halfWidth
		this._right = x + this._halfWidth

		return this
	}

	// Sets center X adjusting left and right accordingly.
	setCenterX(x) {
		this.nuSetCenterX(x)
		this.update()
		return this
	}

	// setCenterY without calling update.
	nuSetCenterY(y) {
		y = Math.round(y)

		this._top = y - this._halfWidth
		this._bottom = y + this._halfWidth

		return this
	}

	// Sets center Y adjusting top and bottom accordingly.
	setCenterY(y) {
		this.nuSetCenterY(y)
		this.update()
		return this
	}

	// setWidth without calling update.
	nuSetWidth(w) {
		w = Math.round(w)

		const diff = w - this._width
		const half = Math.round(diff / 2)

		this._left -= half
		this._right = this._left + w

		return this
	}

	// Sets the width and forces the left and right values to
	// grow or shrink by the same amount to accommodate.
	setWidth(w) {
		this.nuSetWidth(w)
		this.update()
		return this
	}

	// setHeight without calling update.
	nuSetHeight(h) {
		h = Math.round(h)

		const diff = h - this._height
		const half = Math.round(diff / 2)

		this._top -= half
		this._bottom = this._top + h

		return this
	}

	// Sets the height and forces the top and bottom values
	// to grow or shrink by the same amount to accommodate.
	setHeight(h) {
		this.nuSetHeight(h)
		this.update()
		return this
	}

	// setWidthFromLeft without calling update.
	nuSetWidthFromLeft(w) {
		this._right = this._left + w
		return this
	}

	// Sets the width by forcing the right value to grow or
	// shrink to accommodate.
	setWidthFromLeft(w) {
		this.nuSetWidthFromLeft(w)
		this.update()
		return this
	}

	// setWidthFromRight without calling update.
	nuSetWidthFromRight(w) {
		this._left = this._right - w
		return this
	}

	// Sets the width by forcing the left value to grow or
	// shrink to accommodate.
	setWidthFromRight(w) {
		this.nuSetWidthFromRight(w)
		this.update()
		return this
	}

	// setHeightFromTop without calling update.
	nuSetHeightFromTop(h) {
		this._bottom = this._top + h
		return this
	}

	// Sets the height by forcing the bottom value to grow or
	// shrink to accommodate.
	setHeightFromTop(h) {
		this.nuSetHeightFromTop(h)
		this.update()
		return this
	}

	// setHeightFromBottom without calling update.
	nuSetHeightFromBottom(h) {
		this._top = this._bottom - h
		return this
	}

	// Sets the height by forcing the top value to grow or
	// shrink to accommodate.
	setHeightFromBottom(h) {
		this.nuSetHeightFromBottom(h)
		this.update()
		return this
	}

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

	// Returns a string representing the bounds in
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
			this._width, //
			this._height, //
		].join(' ')
	}
}

function calcCenter(min, max) {
	return Math.round(max - (max - min) / 2)
}
