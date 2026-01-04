import { NAME_SPACE } from './util.js'
import Elemental from './Elemental.js'
import BBox from './BBox.js'

// An Elemental for drawing a standard SVG Circle.
export default class Circle extends Elemental {
	// Same as constructing the Circle class directly.
	static from(cx, cy, r) {
		return new Circle(cx, cy, r)
	}

	_bbox = new BBox()

	// Arguments:
	// [0] center X (optional)
	// [1] center Y (optional)
	// [2] radius (optional)
	constructor(cx = 0, cy = 0, r = 0) {
		super()

		this.doMuted(() => {
			this.attrs({
				stroke: 'black',
				fill: 'white',
				cx,
				cy,
				r,
			})
		})

		this._generateElement()
	}

	get centerX() {
		return this.attr('cx')
	}

	set centerX(v) {
		this.setCenterX(v)
		return v
	}

	get centerY() {
		return this.attr('cy')
	}

	set centerY(v) {
		this.setCenterY(v)
		return v
	}

	get radius() {
		return this.attr('r')
	}

	set radius(v) {
		this.setRadius(v)
		return v
	}

	// Returns a bounding box around the circle.
	//
	// Due to current SVG stroke mechanics, the stroke may
	// not be visually contained within the box.
	//
	// You can receive notifications to box changes, but
	// notifications are one way, i.e. changing box values
	// does nothing and will be overwritten on next update.
	get bbox() {
		return this._bbox
	}

	// Sets the X value of the circle center.
	setCenterX(cx) {
		this.attr('cx', cx)
		return this
	}

	// Sets the Y value of the circle center.
	setCenterY(cy) {
		this.attr('cy', cy)
		return this
	}

	// Sets the X and Y value of the circle center.
	setCenter(cx, cy) {
		this.attrs({ cx, cy })
		return this
	}

	// Sets the circle radius.
	setRadius(r) {
		this.attr('r', r)
		return this
	}

	// Moves the circle on the X and Y plane by dx and dy,
	// each may be negative.
	moveBy(dx, dy) {
		this._moveX(dx)
		this._moveY(dy)
		this.updated()
		return this
	}

	_moveX(dx) {
		const curr = this.centerX
		this.attr('cx', curr + dx)
	}

	_moveY(dy) {
		const curr = this.centerY
		this.attr('cy', curr + dy)
	}

	// Increases the radius by half the passed length.
	// Negative lengths shrink the circle.
	//
	// This does not apply a transform, It scales by directly
	// adjusting the values defining the shape. This is why
	// the function is not called 'scaleBy'.
	growBy(v) {
		const r = this.radius + v / 2
		this.setRadius(r)
		return this
	}

	// Creates a deep copy of the circle.
	clone() {
		return new Circle(
			this.centerX, //
			this.centerY, //
			this.radius //
		)
	}

	updated() {
		this._updateBBox()
		super.updated()
	}

	_generateElement() {
		const circle = document.createElementNS(NAME_SPACE, 'circle')
		this._setElement(circle)
		this.updated()
	}

	_updateBBox() {
		const bbox = this._bbox

		bbox.doMuted(() => {
			bbox.setWidth(this.radius * 2)
			bbox.setHeight(this.radius * 2)
			bbox.setCenter(
				this.centerX, //
				this.centerY //
			)
		})

		bbox.updated()
	}
}
