import { EventGroup, List } from '$ramen'

export default class SelectedElementsEditor extends EventGroup {
	_selected = new List()

	// TODO: Should this editor handle element deletions?
	//       I'm thinking yes. Because it's being designed to
	//       handle all other elemnt changes.

	clear() {
		super.clear()
		this.clearSelected()
	}

	clearSelected() {
		this._showSelected()
		this._selected.clear()
	}

	__when__added_to_group() {
		// TODO: Maybe set hidden visibility on selected
		//       elements and add editor personalised versions
		//       here. This will allow us to remove selected
		//       functions from Path class and control how it
		//       appears to the user. Probably need to update
		//       the editors representation on each change.
		//       Also need to show paths again once unselected.
	}

	__when__removed_from_group() {
		this.clearSelected()
	}

	__on__element_selected(e) {
		this.clearSelected()
		this._selected.push(e.detail.selected)
	}

	__on__modify_selected_elements(e) {
		this._selected.forEach((s) => s.edit(e.detail))

		this.canvas.dispatch('elements_updated', {
			elements: this._selected,
		})
	}

	_hideSelected() {
		this._selected.forEach((s) => s.edit({ visible: false }))
	}

	_showSelected() {
		this._selected.forEach((s) => s.edit({ visible: true }))
	}
}
