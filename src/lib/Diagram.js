import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null
	_unlisten = null

	constructor(canvas) {
		super()

		this._canvas = canvas

		canvas.dispatch('diagram_init', {
			diagram: this,
		})
	}

	_group_added() {
		if (!this._unlisten) {
			this._unlisten = this._canvas.listen(this)
		}
	}

	_group_removed() {
		if (this._unlisten) {
			this._unlisten()
			this._unlisten = null
		}
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
