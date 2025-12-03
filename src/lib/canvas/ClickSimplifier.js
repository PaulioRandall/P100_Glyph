import { EventGroup, EventUtil } from '$ramen'

export default class ClickSimplifier extends EventGroup {
	_pointerId = null

	__group__removed() {
		super.group_removed()
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
