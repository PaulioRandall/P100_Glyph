import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import List from './List.js'

// A standard SVG group for clustering a set of elements
// together.
export default class Group extends Elemental {
	_elementals = new List()

	// Returns the number of elementals in the group.
	get size() {
		return this._elementals.length
	}

	constructor() {
		super()
		this._generateElement()
	}

	// Adds elementals. Updates to the elementals trigger an
	// update on the group.
	add(...elementals) {
		for (const e of elementals) {
			this._elementals.push(e)
			this.element.appendChild(e.element)
			e.onUpdate(this.notifier)
		}

		this.updated()
		return this
	}

	// Removes elementals.
	remove(...elementals) {
		this._remove(elementals)
		this.updated()
		return this
	}

	// Removes all elementals. Update is only called once
	// after all have been removed.
	clear() {
		this._remove([...this._elementals])
		this.updated()
		return this
	}

	// Moves the group by dx on the X plane. dx may be
	// negative.
	moveX(dx) {
		for (const elem of this._elementals) {
			elem.moveX(dx)
		}

		this.updated()
		return this
	}

	// Moves the group by dy on the Y plane. dy may be
	// negative.
	moveY(dy) {
		for (const elem of this._elementals) {
			elem.moveY(dy)
		}

		this.updated()
		return this
	}

	// TODO: moveXY(x,y)

	_generateElement() {
		const group = document.createElementNS(NAME_SPACE, 'g')
		this._setElement(group)
		this.updated()
	}

	_remove(elementals) {
		for (const e of elementals) {
			if (!this._elementals.includes(e)) {
				continue
			}

			e.offUpdate(this.notifier)

			this.element.removeChild(e.element)
			this._elementals.remove(e)
		}
	}
}
