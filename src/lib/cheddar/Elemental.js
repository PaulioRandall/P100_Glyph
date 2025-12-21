import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'

// Classes extending the Elemental class map to a single
// HTML element which is updateable.
//
// TODO: Document.
export default class Elemental extends Updateable {
	_element = null

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

	setId(id) {
		this._element.id = id
		this.update()
		return this
	}

	addTo(group) {
		group.add(this)
		return this
	}

	canTranslate() {
		return false
	}

	update() {
		if (this.element && !this.element.id) {
			this.element.id = randomId()
		}

		super.update()
	}

	_setElement(element) {
		this._element = element
	}
}
