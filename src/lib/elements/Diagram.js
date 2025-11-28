import { Two, CanvasGroup } from '$ramen'

export default class Diagram extends CanvasGroup {
	constructor(canvas) {
		super(canvas)
	}

	_event_path_created(e) {
		super.add(e.detail.path)

		this.canvas.dispatch('diagram_updated', {
			diagram: this,
		})
	}

	_event_element_delete(e) {
		super.remove(e.detail.element)

		this.canvas.dispatch('diagram_updated', {
			diagram: this,
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
