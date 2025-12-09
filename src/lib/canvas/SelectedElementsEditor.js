import { EventGroup, List } from '$ramen'

export default class SelectedElementsEditor extends EventGroup {
	_selected = new List()

	// TODO: Should this editor handle element deletions?
	//       I'm thinking yes. Because it's being designed to
	//       handle all other elemnt changes.

	clear() {
		super.clear()
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
		this._selected.clear()
	}

	__on__element_selected(e) {
		this._selected.clear()
		this._selected.push(e.detail.selected)
	}

	__on__modify_selected_elements(e) {
		const edits = e.detail
		let edited = false

		for (const editKey in e.detail) {
			edited |= this._applyModification(editKey, edits[editKey])
		}

		this._dispatchIfEdited(edited)
	}

	_applyModification(key, value) {
		switch (key) {
			case 'closed':
				this._setPathClosed(value)
				return true
			default:
				console.warn(`Unknown modification key '${key}'`)
				return false
		}
	}

	_setPathClosed(value) {
		this._selected.forEach((s) => s.setClosed(value))
	}

	_dispatchIfEdited(edited) {
		if (edited) {
			this.canvas.dispatch('elements_updated', {
				elements: this._selected,
			})
		}
	}
}
