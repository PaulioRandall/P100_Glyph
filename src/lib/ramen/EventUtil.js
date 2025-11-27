export default class EventUtil {
	static LEFT_BUTTON = 0
	static MIDDLE_BUTTON = 1
	static RIGHT_BUTTON = 2

	static x(event) {
		return event.offsetX
	}

	static y(event) {
		return event.offsetY
	}

	static isLeftButton(event) {
		return event.button === EventUtil.LEFT_BUTTON
	}

	static isMiddleButton(event) {
		return event.button === EventUtil.MIDDLE_BUTTON
	}

	static isRightButton(event) {
		return event.button === EventUtil.RIGHT_BUTTON
	}

	_event = null

	constructor(event) {
		this._event = event
	}

	get event() {
		return this._event
	}

	detail(prop = null) {
		const detail = this._event.detail
		return prop ? detail[prop] : detail
	}

	x() {
		return EventUtil.x(this._event)
	}

	y() {
		return EventUtil.y(this._event)
	}

	isLeftButton() {
		return EventUtil.isLeftButton(this._event)
	}

	isMiddleButton() {
		return EventUtil.isMiddleButton(this._event)
	}

	isRightButton() {
		return EventUtil.isRightButton(this._event)
	}
}
