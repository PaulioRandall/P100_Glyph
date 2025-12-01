import { CanvasGroup } from '$ramen'

const EVENTS = [
	//'grid_cell_focus',
	//'left_click',
	//'middle_click',
	//'right_click',
	//'path_started',
	//'path_vertex_added',
	//'path_vertex_removed',
	//'path_reset',
	//'path_created'
]

export default class EventLogger extends CanvasGroup {
	_group_added() {
		for (const type of EVENTS) {
			this._unlisten = this.canvas.listen(type, (e) =>
				console.log(type, e.detail)
			)
		}
	}
}
