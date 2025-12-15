import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import Bounds from './Bounds.js'
import List from './List.js'
import Path from './Path.js'

export default class SVG extends Updateable {
	static Path = Path

	_container = null
	_dom = null
	_shapes = new List()
	_viewbox = new Bounds()

	constructor(container) {
		super()

		this._container = container
		this.update()
	}

	get container() {
		return this._container
	}

	get dom() {
		return this._dom
	}

	setViewbox(left, top, width, height) {
		this._viewbox.set(left, top, left + width, top + height)
		this.update()
	}

	add(shape) {
		this._shapes.push(shape)
		this.update()
	}

	update() {
		this._dom = generateSvgElement(this._viewbox)
		this.container.replaceChildren(this._dom)

		for (const shape of this._shapes) {
			this._dom.appendChild(shape.element)
		}

		super.update()
	}
}

function generateSvgElement(viewbox) {
	const svg = document.createElementNS(NAME_SPACE, 'svg')

	svg.setAttribute('xmlns', NAME_SPACE)
	svg.setAttribute('viewBox', viewbox.toString())
	svg.setAttribute('preserveAspectRatio', 'xMaxYMax meet')

	svg.style.display = 'block'
	svg.style.width = '100%'
	svg.style.height = '100%'

	return svg
}
