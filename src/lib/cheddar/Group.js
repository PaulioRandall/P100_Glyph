import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import List from './List.js'

export default class Group extends Elemental {
	_elementals = new List()

	constructor() {
		super()

		this._generateElement()
	}

	add(elemental) {
		this._elementals.push(elemental)
		this.element.appendChild(elemental.element)

		elemental.update()
		this.update()

		return this
	}

	remove(elemental) {
		if (!this._elementals.includes(elemental)) {
			return
		}

		this.element.removeChild(elemental.element)
		this._elementals.remove(elemental)

		elemental.update()
		this.update()

		return this
	}

	_generateElement() {
		const group = document.createElementNS(NAME_SPACE, 'g')
		this._setElement(group)
	}
}
