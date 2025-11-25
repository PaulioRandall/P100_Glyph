import { Two, Group } from './ramen'

export default class Diagram extends Group {
	_canvas = null

	constructor(canvas) {
		super()

		this._canvas = canvas
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
