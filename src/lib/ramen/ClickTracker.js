export default class ClickTracker {
	_delay = 0
	_count = 0
	_timeoutId = null

	constructor(delay = 400) {
		this._delay = delay
	}

	get count() {
		return this._count
	}

	reset() {
		clearTimeout(this._timeoutId)
		this._timeoutId = null
		this._count = 0
	}

	click() {
		this._count++

		clearTimeout(this._timeoutId)
		this._timeoutId = setTimeout(this.reset.bind(this), this._delay)

		return this._count
	}
}
