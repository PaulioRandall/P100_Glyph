import { EventGroup, List } from '$ramen-grid'
import Nodes from './Nodes.js'

export default class SelectedElementsEditor extends EventGroup {
	_selected = null
	_nodes = null

	constructor(canvas) {
		super(canvas)

		this._nodes = new Nodes(canvas)
		this.add(this._nodes)
	}

	__when__removed_from_group() {
		this._reset()
	}

	__on__element_selected(e) {
		this._reset()

		const newSelected = e.detail.selected

		if (newSelected) {
			this._selected = newSelected
			this._highlightSelected()
			this._updateNodes()
		}

		this.dispatch('change_mode', {
			mode: newSelected ? 'Editing' : 'Idle',
		})
	}

	__on__elements_updated() {
		this._updateNodes()
	}

	__on__modify_selected_elements(e) {
		this._selected.applyStyles(e.detail)

		this.dispatch('element_updated', {
			element: this._selected,
		})
	}

	_reset() {
		this._unhighlightSelected()
		this._selected = null
		this._updateNodes()
	}

	_highlightSelected() {
		this._selected?.applyStyles({
			stroke: 'blue',
		})
	}

	_unhighlightSelected() {
		this._selected?.applyStyles({
			stroke: undefined,
		})
	}

	_updateNodes() {
		if (this._selected) {
			this._nodes.setCells(this._selected.geometry)
		} else {
			this._nodes.reset()
		}
	}
}
