import { CanvasGroup } from '$ramen'

const EVENTS = [
	'grid_cell_focus',

	'left_click',
	'middle_click',
	'right_click',

	'hovering_cell_init',

	'diagram_init',
	'diagram_updated',

	'path_drawer_init',
	'path_started',
	'path_vertex_added',
	'path_vertex_removed',
	'path_reset',
	'path_created',
]

export default class EventLogger extends CanvasGroup {
	constructor(canvas) {
		super(canvas)
	}

	_group_added() {
		for (const type of EVENTS) {
			this.canvas.listen(type, () => console.log(type))
		}
	}
}
