import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Group from './Group.js'
import BBox from './BBox.js'
import List from './List.js'

// Adapter for creating and managing an SVG element.
export default class SVG extends Elemental {
	_group = new Group()
	_viewbox = new BBox()
	_viewboxUpdater = this._viewboxUpdated.bind(this)

	constructor() {
		super()

		this._generateElement()

		this._group.onUpdate(this.updater)
		this._viewbox.onUpdate(this._viewboxUpdater)
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

	// Adds Elementals to the root group. Updates to
	// Elementals will propagate to the group.
	add(...elementals) {
		this._group.add(...elementals)
		return this
	}

	// Removes Elementals from the root group.
	remove(...elementals) {
		this._group.remove(...elementals)
		return this
	}

	// Removes all Elementals from the root group.
	clear() {
		this._group.clear(elemental)
		this.update()
		return this
	}

	_viewboxUpdated() {
		this.attr('viewBox', this._viewbox.toViewboxString())
	}

	_generateElement() {
		const svg = document.createElementNS(NAME_SPACE, 'svg')
		svg.appendChild(this._group.element)

		this.attr('xmlns', NAME_SPACE)
		this.attr('viewBox', this._viewbox.toViewboxString())
		this.attr('preserveAspectRatio', 'xMaxYMax meet')

		this._setElement(svg)
		this.update()
	}
}
