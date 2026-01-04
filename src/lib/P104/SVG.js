import { NAME_SPACE } from './util.js'
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

	// Resize the viewbox fit the browser window.
	sizeToWindow() {
		this._viewbox.sizeToWindow()
		return this
	}

	// Resize the viewbox to match the underlying element's
	// client bounding box.
	sizeToElement() {
		const rect = this.element.getBoundingClientRect()
		this._viewbox.setEdges(0, 0, rect.width, rect.height)
		return this
	}

	// Calculate the X & Y ratios between the viewbox size
	// and element size, i.e. how much smaller is the
	// viewbox dimensions than the element client dimensions?
	//
	// Note that a value greater than 1 means that the
	// element client diemension is less than the viewbox
	// while a value of 1 means they're both the same length.
	elementToViewbox() {
		return [
			this.viewbox.width / this.element.clientWidth,
			this.viewbox.height / this.element.clientHeight,
		]
	}

	// Calculate the X & Y ratios between the element size
	// and viewbox size, i.e. how much smaller is the
	// element client dimensions than the viewbox dimensions?
	//
	// Note that a value greater than 1 means that the
	// viewbox diemension is less than the element client
	// while a value of 1 means they're both the same length.
	viewboxToElement() {
		return [
			this.element.clientWidth / this.viewbox.width,
			this.element.clientHeight / this.viewbox.height,
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
		client,
		ratio,
		viewboxOffset,
		translateOffset,
		scale
	) {
		let result = client * ratio
		result -= translateOffset * scale
		result += viewboxOffset
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
