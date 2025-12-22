import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import List from './List.js'

export default class Group extends Elemental {
	_elementals = new List()

	get length() {
		return this._elementals.length
	}

	constructor() {
		super()
		this._generateElement()
	}

	nuAdd(...elementals) {
		for (const e of elementals) {
			this._elementals.push(e)
			this.element.appendChild(e.element)
			e.onUpdate(this.updater)
		}

		return this
	}

	add(...elementals) {
		this.nuAdd(...elementals)
		this.update()
		return this
	}

	nuRemove(...elementals) {
		for (const e of elementals) {
			if (!this._elementals.includes(e)) {
				continue
			}

			e.offUpdate(this.updater)

			this.element.removeChild(e.element)
			this._elementals.remove(e)
		}

		return this
	}

	remove(...elementals) {
		this.nuRemove(...elementals)
		this.update()
		return this
	}

	nuClear() {
		for (const e of [...this._elementals]) {
			this.nuRemove(e)
		}
		return this
	}

	clear() {
		this.nuClear()
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
