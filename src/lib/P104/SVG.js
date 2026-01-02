import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Group from './Group.js'
import BBox from './BBox.js'

// Adapter for creating and managing an SVG element.
export default class SVG extends Elemental {
	// Same as constructing the Group class directly.
	static from() {
		return new SVG()
	}

	_group = new Group()
	_viewbox = new BBox()
	_viewboxNotifier = this._viewboxUpdated.bind(this)

	constructor() {
		super()

		this._setSVG(this)
		this.group._setSVG(this)

		this._generateElement()

		this._group.onUpdate(this.notifier)
		this._viewbox.onUpdate(this._viewboxNotifier)

		this._addedToGroup(this)
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
		this.updated()
		return this
	}

	sizeToWindow() {
		this._viewbox.sizeToWindow()
		return this
	}

	sizeToElement() {
		const rect = this.element.getBoundingClientRect()
		this._viewbox.setEdges(0, 0, rect.width, rect.height)
		return this
	}

	elementToViewbox() {
		return [
			this.viewbox.width / this.element.clientWidth,
			this.viewbox.height / this.element.clientHeight,
		]
	}

	mapClientToViewbox(clientX, clientY) {
		const ratios = this.elementToViewbox()
		const scale = this.group.transform('scale') || 1
		const offset = this.group.transform('translate') || [0, 0]

		return [
			this._mapClientCoordToViewbox(
				clientX,
				ratios[0],
				this.viewbox.left,
				offset[0],
				scale
			),
			this._mapClientCoordToViewbox(
				clientY,
				ratios[1],
				this.viewbox.top,
				offset[1],
				scale
			),
		]
	}

	_mapClientCoordToViewbox(
		coord,
		ratio,
		viewboxOffset,
		translateOffset,
		scale
	) {
		let result = coord * ratio
		result += viewboxOffset
		result -= translateOffset
		return result * (1 / scale)
	}

	mapClientToViewboxPercent(clientX, clientY) {
		return [
			this._percent(clientX, this.viewbox.width, this.element.clientWidth),
			this._percent(clientY, this.viewbox.height, this.element.clientHeight),
		]
	}

	_percent(client, bboxLen, clientLen) {
		return (100 / bboxLen) * (client * (bboxLen / clientLen))
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
		this.updated()
	}
}
