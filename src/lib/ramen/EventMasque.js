export default class EventMasque {
	static x(event) {
		return event.offsetX
	}

	static y(event) {
		return event.offsetY
	}

	static isLeftButton(event) {
		return event.button === 0
	}

	static isMiddleButton(event) {
		return event.button === 1
	}

	static isRightButton(event) {
		return event.button === 2
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
		return EventMasque.x(this._event)
	}

	y() {
		return EventMasque.y(this._event)
	}

	isLeftButton() {
		return EventMasque.isLeftButton(this._event)
	}

	isMiddleButton() {
		return EventMasque.isMiddleButton(this._event)
	}

	isRightButton() {
		return EventMasque.isRightButton(this._event)
	}
}
