import { Two, CanvasGroup } from './ramen'

export default class Diagram extends CanvasGroup {
	constructor(canvas) {
		super(canvas)

		canvas.dispatch('diagram_init', {
			diagram: this,
		})
	}

	_event_path_created(e) {
		super.add(e.detail.path)

		this.canvas.dispatch('diagram_updated', {
			diagram: this,
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
