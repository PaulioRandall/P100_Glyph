import { CanvasGroup, EventUtil } from '$ramen'

export default class ClickSimplifier extends CanvasGroup {
	_pointerId = null

	constructor(canvas) {
		super(canvas)
	}

	_group_removed() {
		this._pointerId = null
	}

	_event_pointerdown(e) {
		this._pointerId = e.pointerId
	}

	_event_pointerup(e) {
		if (this._pointerId !== e.pointerId) {
			return
		}

		this._pointerId = null

		const eu = new EventUtil(e)
		const detail = { originalEvent: e }

		if (eu.isLeftButton()) {
			this.canvas.dispatch('left_click', detail)
			return
		}

		if (eu.isMiddleButton()) {
			this.canvas.dispatch('middle_click', detail)
			return
		}

		if (eu.isRightButton()) {
			this.canvas.dispatch('right_click', detail)
			return
		}
	}
}
