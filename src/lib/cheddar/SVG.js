import { NAME_SPACE } from './cheddar.js'
import Updateable from './Updateable.js'
import Bounds from './Bounds.js'
import List from './List.js'

export default class SVG extends Updateable {
	_id = 'cheddar'
	_element = null
	_shapes = new List()
	_viewbox = new Bounds()

	constructor(id = 'cheddar') {
		super()

		this._id = id
		this.update()
	}

	get id() {
		return id
	}

	get element() {
		return this._element
	}

	setId(id) {
		this._id = id
		this.update()
		return this
	}

	// TODO: Create Viewbox class to specifically handle
	//       SVG viewbox stuff. This will be important when
	//       doing the panning and zooming stuff.
	setViewbox(left, top, width, height) {
		this._viewbox.set(left, top, left + width, top + height)
		this._element.setAttribute('viewBox', viewboxToString(this._viewbox))
		this.notify()
		return this
	}

	add(shape) {
		this._shapes.push(shape)
		this._element.appendChild(shape.element)
		this.notify()
		return this
	}

	update() {
		this._element = makeElement(this._id, this._viewbox)

		for (const shape of this._shapes) {
			this._element.appendChild(shape.element)
		}

		super.update()
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
