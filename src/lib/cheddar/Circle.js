import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'

// TODO: Document.
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

	get centerX() {
		return this._cx
	}

	get centerY() {
		return this._cy
	}

	get radius() {
		return this._r
	}

	get width() {
		return this._r * 2
	}

	get height() {
		return this._r * 2
	}

	nuSetCenterX(cx) {
		this._cx = cx
		return this
	}

	setCenterX(cx) {
		this.nuSetCenterX(cx)
		this.update()
		return this
	}

	nuSetCenterY(cy) {
		this._cy = cy
		return this
	}

	setCenterY(cy) {
		this.nuSetCenterY(cy)
		this.update()
		return this
	}

	nuSetRadius(r) {
		this._r = r
		return this
	}

	setRadius(r) {
		this.nuSetRadius(r)
		this.update()
		return this
	}

	canTranslate() {
		return true
	}

	nuTranslateX(dx) {
		this._cx += dx
		return this
	}

	translateX(dx) {
		this.nuTranslateX(dx)
		this.update()
		return this
	}

	nuTranslateY(dy) {
		this._cy += dy
		return this
	}

	translateY(dy) {
		this.nuTranslateY(dy)
		this.update()
		return this
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
