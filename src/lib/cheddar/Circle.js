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

		this.attrs.nuPut('stroke', 'black')
		this.attrs.nuPut('fill', 'white')
		this.attrs.nuPut('cx', cx)
		this.attrs.nuPut('cy', cy)
		this.attrs.nuPut('r', r)

		this._generateElement()
	}

	get centerX() {
		return this.attrs.val('cx')
	}

	get centerY() {
		return this.attrs.val('cy')
	}

	get radius() {
		return this.attrs.val('r')
	}

	get width() {
		return this.attrs.val('r') * 2
	}

	get height() {
		return this.attrs.val('r') * 2
	}

	// setCenterX without calling update.
	nuSetCenterX(cx) {
		this.attrs.nuPut('cx', cx)
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
		this.attrs.nuPut('cy', cy)
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
		this.attrs.nuPut('r', r)
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
		const curr = this.attrs.val('cx')
		this.attrs.nuPut('cx', curr + dx)
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
		const curr = this.attrs.val('cy')
		this.attrs.nuPut('cy', curr + dy)
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
		this._setElement(circle)
		this.update()
	}
}
