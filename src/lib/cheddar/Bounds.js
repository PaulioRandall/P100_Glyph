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
// TODO: Add translate functions.
export default class Bounds extends Updateable {
	_left = 0
	_top = 0
	_right = 100
	_bottom = 100

	_w = 100
	_h = 100

	_cx = 50
	_cy = 50

	get x() {
		return this._left
	}

	get y() {
		return this._top
	}

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

	// setLeft without calling update.
	nuSetLeft(v) {
		this._left = v
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
		this._right = v
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
		this._top = v
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
		this._left = left
		this._top = top
		this._right = right
		this._bottom = bottom
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
		this._bottom = v
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
		const half = this._w / 2
		this._left = x - half
		this._right = x + half
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
		const half = this._h / 2
		this._top = y - half
		this._bottom = y + half
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
		const diff = w - this._w
		const half = diff / 2

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
		const diff = h - this._h
		const half = diff / 2

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

	// setWidthAnchorLeft without calling update.
	nuSetWidthAnchorLeft(w) {
		this._right = this._left + w
		return this
	}

	// Sets the width by forcing the right value to grow or
	// shrink to accommodate.
	setWidthAnchorLeft(w) {
		this.nuSetWidthAnchorLeft(w)
		this.update()
		return this
	}

	// setWidthAnchorRight without calling update.
	nuSetWidthAnchorRight(w) {
		this._left = this._right - w
		return this
	}

	// Sets the width by forcing the left value to grow or
	// shrink to accommodate.
	setWidthAnchorRight(w) {
		this.nuSetWidthAnchorRight(w)
		this.update()
		return this
	}

	// setHeightAnchorTop without calling update.
	nuSetHeightAnchorTop(h) {
		this._bottom = this._top + h
		return this
	}

	// Sets the height by forcing the bottom value to grow or
	// shrink to accommodate.
	setHeightAnchorTop(h) {
		this.nuSetHeightAnchorTop(h)
		this.update()
		return this
	}

	// setHeightAnchorBottom without calling update.
	nuSetHeightAnchorBottom(h) {
		this._top = this._bottom - h
		return this
	}

	// Sets the height by forcing the top value to grow or
	// shrink to accommodate.
	setHeightAnchorBottom(h) {
		this.nuSetHeightAnchorBottom(h)
		this.update()
		return this
	}

	update() {
		this._w = this._right - this._left
		this._h = this._bottom - this._top
		this._cx = calcCenter(this._left, this._right)
		this._cy = calcCenter(this._top, this._bottom)
		super.update()
	}

	// Returns true if the coords lay within or on the edge
	// of the bounds.
	contains(x, y) {
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
			this._w, //
			this._h, //
		].join(' ')
	}
}

function calcCenter(min, max) {
	return max - (max - min) / 2
}
