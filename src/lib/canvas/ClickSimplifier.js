import { EventGroup, EventUtil } from '$ramen'

export default class ClickSimplifier extends EventGroup {
	_pointerId = null

	__when__removed_from_group() {
		this._pointerId = null
	}

	__on__pointerdown(e) {
		this._pointerId = e.pointerId
	}

	__on__pointerup(e) {
		if (this._pointerId !== e.pointerId) {
			return
		}

		this._pointerId = null

		const detail = { originalEvent: e }

		if (EventUtil.isLeftButton(e)) {
			this.canvas.dispatch('left_click', detail)
			return
		}

		if (EventUtil.isMiddleButton(e)) {
			this.canvas.dispatch('middle_click', detail)
			return
		}

		if (EventUtil.isRightButton(e)) {
			this.canvas.dispatch('right_click', detail)
			return
		}
	}
}
