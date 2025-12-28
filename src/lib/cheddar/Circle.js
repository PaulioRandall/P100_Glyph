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

	get centerY() {
		return this.attr('cy')
	}

	get radius() {
		return this.attr('r')
	}

	get width() {
		return this.attr('r') * 2
	}

	get height() {
		return this.attr('r') * 2
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

	// Moves the circle on the X plane by dx, which may be
	// negative.
	moveX(dx) {
		this._moveX(dx)
		this.updated()
		return this
	}

	_moveX(dx) {
		const curr = this.attr('cx')
		this.attr('cx', curr + dx)
	}

	// Moves the circle on the Y plane by dy, which may be
	// negative.
	moveY(dy) {
		this._moveY(dy)
		this.updated()
		return this
	}

	_moveY(dy) {
		const curr = this.attr('cy')
		this.attr('cy', curr + dy)
	}

	// Moves the circle on the X and Y plane by dx and dy,
	// each may be negative.
	move(dx, dy) {
		this._moveX(dx)
		this._moveY(dy)
		this.updated()
		return this
	}

	// Increases the radius by half the passed length.
	// Negative lengths shrink the circle.
	grow(by) {
		const r = this.radius + by / 2
		this.setRadius(r)
		return this
	}

	// Decreases the radius by half the passed length.
	// Negative lengths grow the circle.
	shrink(by) {
		const r = this.radius - by / 2
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
