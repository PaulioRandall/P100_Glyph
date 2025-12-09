import { EventGroup, List } from '$ramen'
import Nodes from './Nodes.js'

export default class SelectedElementsEditor extends EventGroup {
	_selected = new List()
	_nodes = null

	// TODO: Should this editor handle element deletions?
	//       I'm thinking yes. Because it's being designed to
	//       handle all other elemnt changes.

	constructor(canvas) {
		super(canvas)

		this._nodes = new Nodes(canvas)
		this.add(this._nodes)
	}

	clearSelected() {
		this._unhighlightSelected()
		this._selected.clear()
		this._updateNodes()
	}

	__when__removed_from_group() {
		this.clearSelected()
	}

	__on__element_selected(e) {
		const newSelection = e.detail.selected

		this.clearSelected()

		if (newSelection) {
			this._selected.push(newSelection)
		}

		this._highlightSelected()
		this._updateNodes()

		this.canvas.dispatch('change_mode', {
			mode: this._selected.length ? 'Editing' : 'Idle',
		})
	}

	__on__elements_updated() {
		this._updateNodes()
	}

	__on__modify_selected_elements(e) {
		this._selected.forEach((s) => s.applyStyles(e.detail))

		this.canvas.dispatch('elements_updated', {
			elements: this._selected,
		})
	}

	_highlightSelected() {
		this._selected.forEach((s) =>
			s.applyStyles({
				stroke: 'blue',
			})
		)
	}

	_unhighlightSelected() {
		this._selected.forEach((s) =>
			s.applyStyles({
				stroke: undefined,
			})
		)
	}

	_updateNodes() {
		const cells = this._selected //
			.map((s) => s.geometry) //
			.flat()
		this._nodes.setCells(cells)
	}
}
