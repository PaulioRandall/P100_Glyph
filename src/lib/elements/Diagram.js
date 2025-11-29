import { Two, CanvasGroup } from '$ramen'

export default class Diagram extends CanvasGroup {
	_elements = null

	constructor(canvas) {
		super(canvas)

		this._elements = canvas.store.get('elementStore')
		this._elements.subscribe(this._elementsChanged.bind(this))
	}

	_elementsChanged(elements) {
		for (const child of this.children) {
			// Remove any deleted elements
			const elem = elements.get(child.id)

			if (!elements.get(child.id)) {
				this.remove(child)
				this.canvas.dispatch('element_removed', {
					element: child,
				})
			}
		}

		const childIds = this.children.map((c) => c.id)
		for (const element of elements) {
			// Add any new elements
			if (!childIds.includes(element.id)) {
				this.add(element)
				this.canvas.dispatch('element_added', {
					element,
				})
			}
		}
	}

	// TODO: toJson()
	// TODO: new class 'DiagramFormatter' that accepts JSON
	//       and converts to SVG, JPG, PNG, etc
}
