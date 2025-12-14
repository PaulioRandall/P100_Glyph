import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import NoticeGroup from './NoticeGroup.js'
import CanvasNav from './CanvasNav.js'

export default class Canvas extends NoticeGroup {
	_container
	_two
	_zui
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
			}.bind(this),
			0 // Do straight after DOM update.
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
