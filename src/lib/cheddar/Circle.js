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

	// setCenterX without calling update.
	nuSetCenterX(cx) {
		this.attr('cx', cx)
		return this
	}

	// Sets the X value of the circle center.
	setCenterX(cx) {
		this.nuSetCenterX(cx)
		this.update()
		return this
	}

	// setCenterY without calling update.
	nuSetCenterY(cy) {
		this.attr('cy', cy)
		return this
	}

	// Sets the Y value of the circle center.
	setCenterY(cy) {
		this.nuSetCenterY(cy)
		this.update()
		return this
	}

	// setRadius without calling update.
	nuSetRadius(r) {
		this.attr('r', r)
		return this
	}

	// Sets the radius of the circle.
	setRadius(r) {
		this.nuSetRadius(r)
		this.update()
		return this
	}

	// Always returns true.
	canTranslate() {
		return true
	}

	// translateX without calling update.
	nuTranslateX(dx) {
		this.attr('cx', this.attr('cx') + dx)
		return this
	}

	// Moves the circle on the X plane by dx, which may be
	// negative.
	translateX(dx) {
		this.nuTranslateX(dx)
		this.update()
		return this
	}

	// translateY without calling update.
	nuTranslateY(dy) {
		this.attr('cy', this.attr('cy') + dy)
		return this
	}

	// Moves the circle on the Y plane by dy, which may be
	// negative.
	translateY(dy) {
		this.nuTranslateY(dy)
		this.update()
		return this
	}

	_generateElement() {
		const circle = document.createElementNS(NAME_SPACE, 'circle')

		circle.setAttribute('stroke', 'black')
		circle.setAttribute('fill', 'none')

		this._setElement(circle)
		this.update()
	}
}
