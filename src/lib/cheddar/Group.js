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

	// add without calling update.
	nuAdd(...elementals) {
		for (const e of elementals) {
			this._elementals.push(e)
			this.element.appendChild(e.element)
			e.onUpdate(this.updater)
		}

		return this
	}

	// Adds elementals. Updates to the elementals trigger an
	// update on the group.
	add(...elementals) {
		this.nuAdd(...elementals)
		this.update()
		return this
	}

	// remove without calling update.
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

	// Removes elementals.
	remove(...elementals) {
		this.nuRemove(...elementals)
		this.update()
		return this
	}

	// clear without calling update.
	nuClear() {
		for (const e of [...this._elementals]) {
			this.nuRemove(e)
		}
		return this
	}

	// Removes all elementals. Update is only called once
	// after all have been removed.
	clear() {
		this.nuClear()
		this.update()
		return this
	}

	// moveX without calling update.
	nuMoveX(dx) {
		for (const elem of this._elementals) {
			elem.moveX(dx)
		}

		return this
	}

	// Moves the group by dx on the X plane. dx may be
	// negative.
	moveX(dx) {
		this.nuMoveX(dx)
		this.update()
		return this
	}

	// moveY without calling update.
	nuMoveY(dy) {
		for (const elem of this._elementals) {
			elem.moveY(dy)
		}

		return this
	}

	// Moves the group by dy on the Y plane. dy may be
	// negative.
	moveY(dy) {
		this.nuMoveY(dy)
		this.update()
		return this
	}

	_generateElement() {
		const group = document.createElementNS(NAME_SPACE, 'g')
		this._setElement(group)
		this.update()
	}
}
