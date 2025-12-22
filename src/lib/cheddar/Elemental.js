import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'

// Classes extending Elemental map to a single HTML
// element.
export default class Elemental extends Updateable {
	_element = null
	_attrs = new Map()

	// Arguments:
	// [0]: element (optional)
	constructor(element = null) {
		super()

		this._element = element
	}

	get id() {
		return this.element.id
	}

	get element() {
		return this._element
	}

	// attr without calling update.
	nuAttr(name, value = undefined) {
		if (value === undefined) {
			return this._attrs.get(name)
		}

		this._attrs.set(name, value)
		return this
	}

	// Gets or sets an element attribute. Getter is invoked
	// if value is undefined, else setter is invoked.
	attr(name, value = undefined) {
		if (value === undefined) {
			return this._attrs.get(name)
		}

		this._attrs.set(name, value)
		this.update()
		return this
	}

	// Shortcut for adding itself to a group.
	addTo(group) {
		group.add(this)
		return this
	}

	// Always true.
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
