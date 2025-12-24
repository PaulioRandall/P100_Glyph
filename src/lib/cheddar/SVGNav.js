import List from './List.js'

export default class Nav {
	_svg = null

	_pointerdown = this._event_pointerdown.bind(this)
	_pointermove = this._event_pointermove.bind(this)
	_pointerup = this._event_pointerup.bind(this)
	_mousewheel = this._event_mousewheel.bind(this)

	_pointer = false
	_enabled = false

	constructor(svg) {
		this._svg = svg

		this.enable()
	}

	enable() {
		if (this._enabled) {
			return this
		}

		this._enabled = true
		this._on('pointerdown', this._pointerdown)
		this._on('pointerup', this._pointerup)
	}

	disable() {
		if (!this._enabled) {
			return this
		}

		this._enabled = false

		this._off('pointermove', this._pointerdown)
		this._off('pointerdown', this._pointerdown)
		this._off('pointerup', this._pointerup)

		if (this._pointer) {
			this._svg.style.set('cursor', 'auto')
		}

		this._pointer = false
	}

	_on(type, handler) {
		this._svg.element.addEventListener(type, handler)
	}

	_off(type, handler) {
		this._svg.element.removeEventListener(type, handler)
	}

	_event_pointerdown(e) {
		e.preventDefault()

		if (this._pointer) {
			return
		}

		this._pointer = true
		this._on('pointermove', this._pointermove)
		this._svg.style.set('cursor', 'grabbing')
	}

	_event_pointermove(e) {
		e.preventDefault()

		this._svg.group.nuMoveX(e.movementX)
		this._svg.group.moveY(e.movementY)
	}

	_event_pointerup(e) {
		e.preventDefault()

		if (this._pointer) {
			this._pointer = false
			this._svg.style.set('cursor', 'auto')
			this._off('pointermove', this._pointermove)
		}
	}

	_event_mousewheel(e) {
		console.log(e.wheelDeltaY, e.deltaY)
	}
}
