import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'

// TODO: Document.
//
// TODO: Add translate functions.
export default class Circle extends Elemental {
	_cx = 0
	_cy = 0
	_r = 0

	constructor(cx = 0, cy = 0, r = 0) {
		super()

		this._cx = cx
		this._cy = cy
		this._r = r

		this._generateElement()
	}

	get cx() {
		return this._cx
	}

	get cy() {
		return this._cy
	}

	get r() {
		return this._r
	}

	get w() {
		return this._r * 2
	}

	get h() {
		return this._r * 2
	}

	get radius() {
		return this._r
	}

	get width() {
		return this.w()
	}

	get height() {
		return this.h()
	}

	nuSetCX(cx) {
		this._cx = cx
		return this
	}

	setCX(cx) {
		this.nuSetCX(cx)
		this.update()
		return this
	}

	nuSetCY(cy) {
		this._cy = cy
		return this
	}

	setCY(cy) {
		this.nuSetCY(cy)
		this.update()
		return this
	}

	nuSetR(r) {
		this._r = r
		return this
	}

	nuSetRadius(r) {
		return this.nuSetR(r)
	}

	setR(r) {
		this.nuSetR(r)
		this.update()
		return this
	}

	setRadius(r) {
		return this.setR(r)
	}

	update() {
		this.element.setAttribute('cx', this._cx)
		this.element.setAttribute('cy', this._cy)
		this.element.setAttribute('r', this._r)
		super.update()
	}

	_generateElement() {
		const circle = document.createElementNS(NAME_SPACE, 'circle')

		circle.setAttribute('cx', this._cx)
		circle.setAttribute('cy', this._cy)
		circle.setAttribute('r', this._r)

		circle.setAttribute('stroke', 'black')
		circle.setAttribute('fill', 'none')

		this._setElement(circle)
	}
}
