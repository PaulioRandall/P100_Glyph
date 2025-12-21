import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import List from './List.js'

// TODO: Document.
export default class Group extends Elemental {
	_elementals = new List()

	constructor() {
		super()
		this._generateElement()
	}

	add(elemental) {
		this._elementals.push(elemental)
		this.element.appendChild(elemental.element)

		elemental.onUpdate(this.updater)

		this.update()
		return this
	}

	remove(elemental) {
		if (!this._elementals.includes(elemental)) {
			return
		}

		elemental.offUpdate(this.updater)

		this.element.removeChild(elemental.element)
		this._elementals.remove(elemental)

		this.update()
		return this
	}

	canTranslate() {
		return true
	}

	nuTranslateX(dx) {
		for (const elem of this._elementals) {
			if (elem.canTranslate()) {
				elem.translateX(dx)
			}
		}

		return this
	}

	translateX(dx) {
		this.nuTranslateX(dx)
		this.update()
		return this
	}

	nuTranslateY(dy) {
		for (const elem of this._elementals) {
			if (elem.canTranslate()) {
				elem.translateY(dy)
			}
		}

		return this
	}

	translateY(dy) {
		this.nuTranslateY(dy)
		this.update()
		return this
	}

	_generateElement() {
		const group = document.createElementNS(NAME_SPACE, 'g')
		this._setElement(group)
	}
}
