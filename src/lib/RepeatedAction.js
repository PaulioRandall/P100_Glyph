export default class RepeatedAction {
	_action = null
	_delay = null
	_active = true
	_id = null
	_count = 0

	constructor(action, delay) {
		this._action = action
		this._delay = delay
	}

	get active() {
		return this._active
	}

	get count() {
		return this._count
	}

	get action() {
		return this._action
	}

	get delay() {
		return this._delay
	}

	set delay(timeMS) {
		this._delay = timeMS
	}

	start(startDelay = null) {
		this.stop()
		this._active = true
		this._repeat(startDelay || this._delay)
	}

	_repeat(delay) {
		this._id = setTimeout(this._doAction.bind(this), delay)
	}

	_doAction() {
		this._count++
		this._id = null

		if (this._active && this._action()) {
			this._repeat(this._delay)
		}
	}

	stop() {
		const count = this._count

		this._active = false
		this._id = null
		this._count = 0

		return count
	}
}
