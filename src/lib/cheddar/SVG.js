import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Group from './Group.js'
import Bounds from './Bounds.js'
import List from './List.js'

export default class SVG extends Elemental {
	_group = new Group()
	_viewbox = new Bounds()

	constructor() {
		super()

		this._generateElement()

		this._viewbox.onUpdate(this._updateViewbox.bind(this))
		this.update()
	}

	get viewbox() {
		return this._viewbox
	}

	_updateViewbox() {
		this.element.setAttribute(
			'viewBox', //
			this._viewbox.toViewboxString() //
		)
	}

	add(elemental) {
		this._group.add(elemental)
		this.update()
		return this
	}

	_generateElement() {
		const viewboxString = this._viewbox.toViewboxString()
		const svg = document.createElementNS(NAME_SPACE, 'svg')

		svg.appendChild(this._group.element)

		svg.setAttribute('xmlns', NAME_SPACE)
		svg.setAttribute('viewBox', viewboxString)
		svg.setAttribute('preserveAspectRatio', 'xMaxYMax meet')

		svg.style.display = 'block'
		svg.style.width = '100%'
		svg.style.height = '100%'

		this._setElement(svg)
	}
}
