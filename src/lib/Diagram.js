import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null
	_unlistenNewpath = null

	constructor(canvas) {
		super()

		this._canvas = canvas

		this._unlistenNewpath = canvas.listen(
			'newpath',
			this._addElement.bind(this)
		)
	}

	destroy() {
		this._unlistenNewpath?.call(null)
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
