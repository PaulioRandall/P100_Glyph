import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'

// An Elemental for drawing a standard SVG Circle.
export default class Circle extends Elemental {
	// Same as constructing the Circle class directly.
	static from(cx, cy, r) {
		return new Circle(cx, cy, r)
	}

	// Arguments:
	// [0] center X (optional)
	// [1] center Y (optional)
	// [2] radius (optional)
	constructor(cx = 0, cy = 0, r = 0) {
		super()

		this.attr('stroke', 'black')
		this.attr('fill', 'white')
		this.attr('cx', cx)
		this.attr('cy', cy)
		this.attr('r', r)

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

	// Sets the X value of the circle center.
	setCenterX(cx) {
		this.attr('cx', cx)
		this.updated()
		return this
	}

	// Sets the Y value of the circle center.
	setCenterY(cy) {
		this.attr('cy', cy)
		this.updated()
		return this
	}

	// Sets the X and Y value of the circle center.
	setCenter(cx, cy) {
		this.attr('cx', cx)
		this.attr('cy', cy)
		this.updated()
		return this
	}

	// Sets the circle radius.
	setRadius(r) {
		this.attr('r', r)
		this.updated()
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
		const curr = this.attr('cx')
		this.attr('cx', curr + dx)
	}

	_moveY(dy) {
		const curr = this.attr('cy')
		this.attr('cy', curr + dy)
	}

	// Increases the radius by half the passed length.
	// Negative lengths shrink the circle.
	//
	// This does not apply a transform, It scales by directly
	// adjusting the values defining the shape. This is why
	// the function is not called 'scaleBy'.
	//
	// TODO: Allow user to pass in origin coords.
	growBy(v) {
		const r = this.radius + v / 2
		this.setRadius(r)
		return this
	}

	// Creates a deep copy of the circle.
	clone() {
		return new Circle(
			this.attr('cx'), //
			this.attr('cy'), //
			this.attr('r') //
		)
	}

	_generateElement() {
		const circle = document.createElementNS(NAME_SPACE, 'circle')
		this._setElement(circle)
		this.updated()
	}
}
