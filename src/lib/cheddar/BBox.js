import Updateable from './Updateable.js'

// Represents a bounding box or viewbox on a 2D plane.
export default class BBox extends Updateable {
	// Same as constructing the BBox class directly.
	static from() {
		return new BBox()
	}

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

	set left(v) {
		this.setLeft(v)
		return v
	}

	get top() {
		return this._top
	}

	set top(v) {
		this.setTop(v)
		return v
	}

	get right() {
		return this._right
	}

	set right(v) {
		this.setRight(v)
		return v
	}

	get bottom() {
		return this._bottom
	}

	set bottom(v) {
		this.setBottom(v)
		return v
	}

	get width() {
		return this._w
	}

	set width(v) {
		this.setWidth(v, 'center')
		return v
	}

	get height() {
		return this._h
	}

	set height(v) {
		this.setHeight(v, 'center')
		return v
	}

	get centerX() {
		return this._cx
	}

	set centerX(v) {
		this.setCenterX(v)
		return v
	}

	get centerY() {
		return this._cy
	}

	set centerY(v) {
		this.setCenterY(v)
		return v
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

	// Sets the width. The anchor defines the point to keep
	// still while the other parts expand and shrink to fit.
	//
	// By default, the anchor is on the 'center' forcing both
	// sides to expand or shrink evenly. It's also possible
	// to anchor on the 'left' or 'right'.
	setWidth(w, anchor = 'center') {
		if (anchor === 'left') {
			this._setWidthAnchorLeft(w)
		} else if (anchor === 'center') {
			this._setWidthAnchorCenter(w)
		} else if (anchor === 'right') {
			this._setWidthAnchorRight(w)
		} else {
			throw new Error(`Unknown anchor '${anchor}'`)
		}

		this.updated()
		return this
	}

	_setWidthAnchorLeft(w) {
		this._w = w
		this._right = this._left + w
		this._updateCenterX()
	}

	_setWidthAnchorCenter(w) {
		this._w = w
		this._left = this._cx - w / 2
		this._right = this._left + w
		this._updateCenterX()
	}

	_setWidthAnchorRight(w) {
		this._w = w
		this._left = this._right - w
		this._updateCenterX()
	}

	// Sets the height. The anchor defines the point to keep
	// still while the other parts expand and shrink to fit.
	//
	// By default, the anchor is on the 'center' forcing both
	// sides to expand or shrink evenly. It's also possible
	// to anchor on the 'top' or 'bottom'.
	setHeight(w, anchor = 'center') {
		if (anchor === 'top') {
			this._setHeightAnchorTop(w)
		} else if (anchor === 'center') {
			this._setHeightAnchorCenter(w)
		} else if (anchor === 'bottom') {
			this._setHeightAnchorBottom(w)
		} else {
			throw new Error(`Unknown anchor '${anchor}'`)
		}

		this.updated()
		return this
	}

	_setHeightAnchorTop(h) {
		this._h = h
		this._bottom = this._top + h
		this._updateCenterY()
	}

	_setHeightAnchorCenter(h) {
		this._h = h
		this._top = this._cy - h / 2
		this._bottom = this._top + h
		this._updateCenterY()
	}

	_setHeightAnchorBottom(h) {
		this._h = h
		this._top = this._bottom - h
		this._updateCenterY()
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

	// Grows the box by the passed factor. Negative values
	// shrink the box.
	//
	// By default, the anchor is on the 'center center'
	// ('height width') forcing the sides to expand or shrink
	// evenly. It's also possible to anchor anchor height on
	// 'top' or 'bottom' and width on 'left' or 'right'.
	//
	// This does not apply a transform, It scales by directly
	// adjusting the values defining the shape. This is why
	// the function is not called 'scale'.
	growBy(factor, anchor = 'center center') {
		const [hAnchor, wAnchor] = anchor.split(' ', 2)

		this.doMuted(() => {
			this.setWidth(this._w * factor, wAnchor)
			this.setHeight(this._h * factor, hAnchor)
		})

		this.updated()
		return this
	}

	// Resizes the box to match the inner width and height
	// of the browser window.
	//
	// Requires access to global 'window' object.
	sizeToWindow() {
		this.setEdges(0, 0, window.innerWidth, window.innerHeight)
		return this
	}

	// Sets the edges to be the same as the passed BBox.
	copy(bbox) {
		return this.setEdges(
			bbox.left, //
			bbox.top, //
			bbox.right, //
			bbox.bottom //
		)
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
