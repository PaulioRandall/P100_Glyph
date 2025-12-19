import Updateable from './Updateable.js'

// Classes extending the Elemental class map to a single
// HTML element which is updateable.
export default class Elemental extends Updateable {
	_element = null

	constructor(element = null) {
		super()

		this._element = element
	}

	get element() {
		return this._element
	}

	_setElement(element) {
		this._element = element
	}
}
