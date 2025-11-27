import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Group from './Group.js'
import Store from './Store.js'
import Eventor from './Eventor.js'
import Loader from './Loader.js'

export default class Canvas extends Group {
	_container
	_two
	_zui

	_store = new Store()
	_loader = new Loader(this)

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

		this.load(() => {
			this._two.add(this)

			return () => {
				this._two.clear()
				this._zui.reset()
			}
		})
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

	get width() {
		return this._two.width
	}

	get height() {
		return this._two.height
	}

	get store() {
		return this._store
	}

	get cursorStyle() {
		return this.dom.style.cursor
	}

	set cursorStyle(style) {
		this.dom.style.cursor = style
	}

	dispatch(type, detail = {}) {
		// IDEA: Can attach things to the detail.

		const event = new CustomEvent(type, {
			bubbles: false,
			cancelable: false,
			detail,
		})

		return this.dom.dispatchEvent(event)
	}

	// NEXT: Redesign.
	//       ALSO allow an object to be passed containing
	//       functions like '_event_mousemove' that are auto
	//       registered. The returned unlisten func unlistens
	//       to all the object's registered events at once.
	//
	//       Then remove the eventor function.
	listen(type, callback, options) {
		this.dom.addEventListener(type, callback, options)
		return () => this.dom.removeEventListener(type, callback, options)
	}

	eventor(binding) {
		return new Eventor(this, binding)
	}

	load(loadFunc) {
		this._loader.load(loadFunc)
	}

	reload() {
		this._loader.reload()
	}

	free() {
		this._loader.free()
	}
}
