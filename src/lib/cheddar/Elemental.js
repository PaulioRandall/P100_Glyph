import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'

// Classes extending the Elemental class map to a single
// HTML element which is updateable.
//
// TODO: Document.
export default class Elemental extends Updateable {
	_element = null
	_attrs = new Map()

	constructor(element = null) {
		super()

		this._element = element
	}

	// Returns the ID on the element.
	get id() {
		return this.element.id
	}

	get element() {
		return this._element
	}

	nuAttr(name, value = undefined) {
		if (value === undefined) {
			return this._attrs.get(name)
		}

		this._attrs.set(name, value)
		return this
	}

	attr(name, value = undefined) {
		const result = this.nuAttr(name, value)
		this.update()
		return result
	}

	addTo(group) {
		group.add(this)
		return this
	}

	canTranslate() {
		return false
	}

	update() {
		if (!this.element) {
			super.update()
			return
		}

		if (!this._attrs.get('id')) {
			this._attrs.set('id', randomId())
		}

		this._attrs.forEach((value, name) => {
			if (value === undefined) {
				this.element.removeAttribute(name)
			} else {
				this.element.setAttribute(name, value)
			}
		})

		super.update()
	}

	_setElement(element) {
		this._element = element
	}
}
