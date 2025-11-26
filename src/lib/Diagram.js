import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null
	_eventor = null

	constructor(canvas) {
		super()

		this._canvas = canvas

		this._eventor = canvas.eventor(this)
		this._eventor.listen('newpath', this._addElement)
	}

	free() {
		this._eventor.free()
	}

	_addElement(e) {
		super.add(e.detail.path)

		this._canvas.dispatch('diagramupdate', {
			diagram: this,
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
