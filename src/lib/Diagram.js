import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null
	_unlisten = null

	constructor(canvas) {
		super()

		this._canvas = canvas
		this._unlisten = this._canvas.listen(this)

		canvas.dispatch('diagram_init', {
			diagram: this,
		})
	}

	free() {
		this._unlisten()
	}

	_event_path_created(e) {
		super.add(e.detail.path)

		this._canvas.dispatch('diagram_updated', {
			diagram: this,
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
