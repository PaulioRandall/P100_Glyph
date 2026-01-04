import ArrayUtil from '../P101'
import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import BBox from './BBox.js'

// A standard SVG group for clustering a set of elements
// together.
export default class Group extends Elemental {
	// Same as constructing the Group class directly.
	static from() {
		return new Group()
	}

	_elementals = []
	_bbox = new BBox()

	// Returns the number of elementals in the group.
	get size() {
		return this._elementals.length
	}

	get bbox() {
		return this._bbox
	}

	get children() {
		return this._elementals
	}

	constructor() {
		super()
		this._generateElement()
	}

	_setSVG(svg) {
		super._setSVG(svg)
		this._elementals.forEach((e) => e._setSVG(svg))
	}

	// Adds elementals. Updates to the elementals trigger an
	// update on the group.
	add(...elementals) {
		for (const e of elementals) {
			this._elementals.push(e)
			this.element.appendChild(e.element)
			e._setSVG(this.svg)
			e.onUpdate(this.notifier)
			e._addedToGroup()
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

	// Moves the group members with a moveBy function
	// by dx and dy, each may be negative.
	moveBy(dx, dy) {
		this.doMuted(() => {
			for (const e of this._elementals) {
				e?.moveBy(dx, dy)
			}
		})

		this.updated()
		return this
	}

	updated() {
		this._updateBBox()
		super.updated()
	}

	_generateElement() {
		const group = document.createElementNS(NAME_SPACE, 'g')
		this._setElement(group)
		this.updated()
	}

	_updateBBox() {
		if (this.size === 0) {
			this.bbox.setEdges(0, 0, 0, 0)
			return
		}

		let left = null
		let top = null
		let right = null
		let bottom = null

		for (const e of this._elementals) {
			if (left === null || left > e.bbox.left) {
				left = e.bbox.left
			}

			if (right === null || right < e.bbox.right) {
				right = e.bbox.right
			}

			if (top === null || top > e.bbox.top) {
				top = e.bbox.top
			}

			if (bottom === null || bottom < e.bbox.bottom) {
				bottom = e.bbox.bottom
			}
		}

		this.bbox.setEdges(left, top, right, bottom)
	}

	_remove(elementals) {
		for (const e of elementals) {
			if (!this._elementals.includes(e)) {
				continue
			}

			e.offUpdate(this.notifier)

			this.element.removeChild(e.element)
			ArrayUtil.remove(this._elementals, e)
			e._removedFromGroup()
			e._setSVG(null)
		}
	}
}
