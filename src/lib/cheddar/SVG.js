import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Group from './Group.js'
import BBox from './BBox.js'
import List from './List.js'

// Adapter for creating and managing an SVG element.
export default class SVG extends Elemental {
	_group = new Group()
	_viewbox = new BBox()

	constructor() {
		super()

		this.attr('xmlns', NAME_SPACE)
		this.attr('preserveAspectRatio', 'xMaxYMax meet')

		this._generateElement()

		this._group.onUpdate(this.updater)
		this._viewbox.onUpdate(this.updater)
	}

	// Gets the root Group for holding Elementals. Updates to
	// the Group propagate to the SVG.
	get group() {
		return this._group
	}

	// Gets the BBox representing the viewbox. Changes to the
	// viewbox are applied to the SVG element, and updates
	// propagate to the SVG.
	get viewbox() {
		return this._viewbox
	}

	// add without calling update.
	nuAdd(...elementals) {
		this._group.nuAdd(...elementals)
		return this
	}

	// Adds Elementals to the root group. Updates to
	// Elementals will propagate to the group.
	add(...elementals) {
		this._group.add(...elementals)
		return this
	}

	// remove without calling update.
	nuRemove(...elementals) {
		this._group.nuRemove(...elementals)
		return this
	}

	// Removes Elementals from the root group.
	remove(...elementals) {
		this._group.remove(...elementals)
		return this
	}

	// clear without calling update.
	nuClear(...elementals) {
		this._group.nuClear(...elementals)
		return this
	}

	// Removes all Elementals from the root group.
	clear() {
		this._group.clear(elemental)
		this.update()
		return this
	}

	update() {
		this.nuAttr('viewBox', this._viewbox.toViewboxString())
		super.update()
	}

	_generateElement() {
		const viewboxString = this._viewbox.toViewboxString()
		const svg = document.createElementNS(NAME_SPACE, 'svg')

		svg.appendChild(this._group.element)

		svg.style.display = 'block'
		svg.style.width = '100%'
		svg.style.height = '100%'

		this._setElement(svg)
		this.update()
	}
}
