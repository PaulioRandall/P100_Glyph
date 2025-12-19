import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Bounds from './Bounds.js'
import List from './List.js'

export default class SVG extends Elemental {
	_id = 'cheddar'
	_shapes = new List()
	_viewbox = new Bounds()

	constructor() {
		super()

		this._generateElement()
		this._viewbox.onUpdate(this._updateViewbox.bind(this))
		this.update()
	}

	get id() {
		return id
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
			this._viewbox.toViewboxString() //
		)
	}

	add(shape) {
		this._shapes.push(shape)
		this._element.appendChild(shape.element)

		this.update()
		return this
	}

	_generateElement() {
		const id = this._id
		const viewboxString = this._viewbox.toViewboxString()
		const svg = document.createElementNS(NAME_SPACE, 'svg')

		svg.setAttribute('id', id)
		svg.setAttribute('xmlns', NAME_SPACE)
		svg.setAttribute('viewBox', viewboxString)
		svg.setAttribute('preserveAspectRatio', 'xMaxYMax meet')

		svg.style.display = 'block'
		svg.style.width = '100%'
		svg.style.height = '100%'

		this._setElement(svg)
	}
}
