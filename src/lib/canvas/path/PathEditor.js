import { Two, EventGroup, NoticeGroup } from '$ramen'
import { PathEditor as TODO } from '../../elements'

export default class PathEditor extends EventGroup {
	_pathEditor = null

	__group__removed() {
		this.clear()
		this._pathEditor = null
	}

	/*
	__on__selected_element_edit_request(e) {
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
*/
}
