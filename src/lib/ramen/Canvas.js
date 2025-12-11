import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import NoticeGroup from './NoticeGroup.js'
import CanvasNav from './CanvasNav.js'

export default class Canvas extends NoticeGroup {
	_container
	_two
	_zui
	_nav
	_store = new Map()

	constructor(container, twoOptions = {}) {
		super()

		this._container = container

		this._two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
			...twoOptions,
		}).appendTo(container)

		this._zui = new ZUI(this)
		this._two.add(this)

		setTimeout(
			function () {
				window.addEventListener('resize', this.two.fit.bind(this))

				this._nav = new CanvasNav(this)
				this.add(this._nav)

				// Zoom out slightly so the main canvas area is
				// fully visible.
				this._zui.zoomSet(0.8, 0, 0)

				// Move so the center of the canvas is close to the
				// the middle of the screen, but not under the
				// overlay.
				this._zui.translateSurface(this.width / 2.5, this.height / 1.8)
			}.bind(this),
			0
		)
	}

	get container() {
		return this._container
	}

	get two() {
		return this._two
	}

	get zui() {
		return this._zui
	}

	get nav() {
		return this._nav
	}

	get dom() {
		return this._two.renderer.domElement
	}

	get store() {
		return this._store
	}

	get width() {
		return this._two.width
	}

	get height() {
		return this._two.height
	}

	get cursorStyle() {
		return this.dom.style.cursor
	}

	set cursorStyle(style) {
		this.dom.style.cursor = style
	}

	// Events

	on(type, callback, options) {
		this.dom.addEventListener(type, callback, options)
		return () => this.off(type, callback, options)
	}

	off(type, callback, options) {
		this.dom.removeEventListener(type, callback, options)
	}

	dispatch(type, detail = {}) {
		const event = new CustomEvent(type, {
			bubbles: false,
			cancelable: false,
			detail,
		})

		return this.dom.dispatchEvent(event)
	}
}
