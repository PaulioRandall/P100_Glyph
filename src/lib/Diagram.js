import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null
	_eventor = null

	constructor(canvas) {
		super()

		this._canvas = canvas

		this._eventor = canvas.eventor(this)
		this._eventor.listen('path_created', this._path_created)

		canvas.dispatch('diagram_init', {
			diagram: this,
		})
	}

	free() {
		this._eventor.free()
	}

	_path_created(e) {
		super.add(e.detail.path)

		this._canvas.dispatch('diagram_updated', {
			diagram: this,
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
