import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'

// An Elemental for drawing a standard SVG Circle.
export default class Circle extends Elemental {
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
		this.update()
		return this
	}

	// Sets the Y value of the circle center.
	setCenterY(cy) {
		this.attr('cy', cy)
		this.update()
		return this
	}

	// Sets the radius of the circle.
	setRadius(r) {
		this.attr('r', r)
		this.update()
		return this
	}

	// Moves the circle on the X plane by dx, which may be
	// negative.
	moveX(dx) {
		const curr = this.attr('cx')
		this.attr('cx', curr + dx)
		this.update()
		return this
	}

	// Moves the circle on the Y plane by dy, which may be
	// negative.
	moveY(dy) {
		const curr = this.attr('cy')
		this.attr('cy', curr + dy)
		this.update()
		return this
	}

	_generateElement() {
		const circle = document.createElementNS(NAME_SPACE, 'circle')
		this._setElement(circle)
		this.update()
	}
}
