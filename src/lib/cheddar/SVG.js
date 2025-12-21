import { NAME_SPACE } from './cheddar.js'
import Elemental from './Elemental.js'
import Group from './Group.js'
import BBox from './BBox.js'
import List from './List.js'

export default class SVG extends Elemental {
	_group = new Group()
	_viewbox = new BBox()

	constructor() {
		super()

		this._generateElement()

		this._group.onUpdate(this.updater)
		this._viewbox.onUpdate(this.updater)
	}

	get viewbox() {
		return this._viewbox
	}

	add(elemental) {
		this._group.add(elemental)
		return this
	}

	remove(elemntal) {
		this._group.remove(elemental)
		return this
	}

	clear() {
		this._group.clear(elemental)
		return this
	}

	update() {
		this.element.setAttribute(
			'viewBox', //
			this._viewbox.toViewboxString() //
		)

		super.update()
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
