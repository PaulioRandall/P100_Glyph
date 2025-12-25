import List from './List.js'

export default class Nav {
	_svg = null

	_pointerdown = this._event_pointerdown.bind(this)
	_pointermove = this._event_pointermove.bind(this)
	_pointerup = this._event_pointerup.bind(this)
	_mousewheel = this._event_mousewheel.bind(this)

	_start = null
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
		this._on('mousewheel', this._mousewheel)
		this._on('wheel', this._mousewheel)
	}

	disable() {
		if (!this._enabled) {
			return this
		}

		this._enabled = false

		if (this._start) {
			this._off('pointermove', this._pointerdown)
			this._off('pointerdown', this._pointerdown)
			this._off('pointerup', this._pointerup)
			this._svg.style.set('cursor', 'auto')
			this._start = null
		}
	}

	_on(type, handler) {
		this._svg.element.addEventListener(type, handler)
	}

	_off(type, handler) {
		this._svg.element.removeEventListener(type, handler)
	}

	_event_pointerdown(e) {
		e.preventDefault()

		if (this._start) {
			return
		}

		this._start = this._svg.group.transform('translate') || [0, 0]
		this._start = this._mapCoords(e)

		this._on('pointermove', this._pointermove)
		this._svg.style('cursor', 'grabbing')
	}

	_event_pointermove(e) {
		e.preventDefault()

		const xy = this._mapCoords(e)
		this._svg.group.transform('translate', xy)
	}

	_event_pointerup(e) {
		e.preventDefault()

		if (this._start) {
			this._start = null
			this._svg.style('cursor', 'auto')
			this._off('pointermove', this._pointermove)
		}
	}

	_event_mousewheel(e) {
		const oldScale = this._svg.group.transform('scale') || 1
		const amount = e.wheelDeltaY > 0 ? 0.1 : -0.1
		const newScale = oldScale + amount

		// TODO: Changing transform origin resets position
		//       and causes a jump. Needs fixing.
		if (newScale > 0.3 && newScale < 2) {
			const xy = this._svg.mapClientToViewboxPercent(e.clientX, e.clientY)
			this._svg.group.attr('transform-origin', `${xy[0]}% ${xy[1]}%`)
			this._svg.group.transform('scale', newScale)
		}
	}

	_mapCoords(e) {
		const xy = this._svg.mapClientToViewbox(e.clientX, e.clientY)

		return [xy[0] - this._start[0], xy[1] - this._start[1]]
	}
}
