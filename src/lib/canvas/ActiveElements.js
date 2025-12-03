import { Two, EventGroup } from '$ramen'
import { PathEditor } from '../elements'

export default class ActiveElements extends EventGroup {
	_pathEditor = null

	__group__removed() {
		super.clear()
		this._pathEditor = null
	}

	__on__request_edit_of_selected_element(e) {
		if (!this._pathEditor) {
			return
		}

		const path = this._pathEditor.path
		const changes = e.detail

		if (typeof changes.closed === 'boolean') {
			this._pathEditor.setClosed(changes.closed)
		}

		this.canvas.dispatch('element_updated', {
			element: path,
		})
	}

	__on__element_focused(e) {
		this.canvas.lastFocused?.updateStyle()
		this.canvas.focused?.updateStyle()
	}

	__on__element_selected(e) {
		super.clear()
		this._pathEditor = null

		const selected = this.canvas.selected

		if (selected) {
			this._pathEditor = new PathEditor(this.canvas, selected)
			super.add(this._pathEditor)

			selected.commands //
				.map((cmd) => makeNode(cmd)) //
				.forEach((n) => super.add(n)) //
		}

		this.canvas.lastSelected?.updateStyle()
		this.canvas.selected?.updateStyle()
	}
}

function makeNode(cmd) {
	const radius = 16
	const { x, y } = cmd.to

	const circle = new Two.Circle(x, y, radius)

	circle.fill = 'lightblue'
	circle.stroke = 'black'
	circle.linewidth = 4

	return circle
}
