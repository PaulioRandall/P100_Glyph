import { Two, CanvasGroup } from '$ramen'

export default class Diagram extends CanvasGroup {
	_elementStore = null

	constructor(canvas) {
		super(canvas)

		this._elementStore = canvas.store.get('elements')
	}

	_event_path_created(e) {
		const element = e.detail.path

		super.add(element)

		this._elementStore.update((elements) => {
			elements.set(element.id, element)
			return elements
		})
	}

	_event_element_delete(e) {
		const element = e.detail.element

		super.remove(element)

		this._elementStore.update((elements) => {
			elements.delete(element.id)
			return elements
		})
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
