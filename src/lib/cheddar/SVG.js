import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import Bounds from './Bounds.js'
import List from './List.js'

export default class SVG extends Updateable {
	_id = 'cheddar'
	_element = null
	_shapes = new List()
	_viewbox = new Bounds()

	constructor(element = null) {
		super()

		// TODO: Tidy
		if (!element) {
			this._element = makeElement(this._id, this._viewbox)
		} else if (element.tagName === 'SVG') {
			this._element = element
			this._updateId()
			this._updateViewbox()
		} else {
			throw new Error('Only accepts an element with an SVG tag name')
		}

		this._viewbox.onUpdate(this._updateViewbox.bind(this))

		this.update()
	}

	get id() {
		return id
	}

	get element() {
		return this._element
	}

	get viewbox() {
		return this._viewbox
	}

	// TODO: Create Group class.
	// TODO: Create master group for the SVG

	setId(id) {
		this._id = id
		this._updateId()
		this.update()
		return this
	}

	_updateId() {
		this._element.setAttribute('id', this._id)
	}

	_updateViewbox() {
		this._element.setAttribute(
			'viewBox', //
			viewboxToString(this._viewbox) //
		)
	}

	add(shape) {
		this._shapes.push(shape)
		this._element.appendChild(shape.element)

		this.update()
		return this
	}
}

function makeElement(id, viewbox) {
	const svg = document.createElementNS(NAME_SPACE, 'svg')

	svg.setAttribute('id', id)
	svg.setAttribute('xmlns', NAME_SPACE)
	svg.setAttribute('viewBox', viewboxToString(viewbox))
	svg.setAttribute('preserveAspectRatio', 'xMaxYMax meet')

	svg.style.display = 'block'
	svg.style.width = '100%'
	svg.style.height = '100%'

	return svg
}

function viewboxToString(viewbox) {
	return [
		viewbox.left, //
		viewbox.top, //
		viewbox.width, //
		viewbox.height, //
	].join(' ')
}
