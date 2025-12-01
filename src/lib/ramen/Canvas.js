import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Group from './Group.js'

// TODO: Remove loader feature

export default class Canvas extends Group {
	_container
	_two
	_zui
	_store = new Map()

	// TODO: reset on window resize
	//       window.addEventListener("resize", myFunction)

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

	dispatch(type, detail = {}) {
		const event = new CustomEvent(type, {
			bubbles: false,
			cancelable: false,
			detail,
		})

		return this.dom.dispatchEvent(event)
	}

	listen(typeOrObject, callbackOrOptions, options) {
		if (isObject(typeOrObject)) {
			return this._listenWithObject(typeOrObject, callbackOrOptions)
		} else {
			return this._listenWithCallback(typeOrObject, callbackOrOptions, options)
		}
	}

	// TODO: Refactor
	_listenWithObject(obj, options) {
		const prefix = '_event_'
		const unlisteners = {}

		const proto = Object.getPrototypeOf(obj)
		const props = Object.getOwnPropertyNames(proto)

		for (const propName of props) {
			if (propName.startsWith(prefix)) {
				const prop = proto[propName]

				if (typeof prop === 'function') {
					const eventType = propName.slice(prefix.length)
					const callback = prop.bind(obj)
					unlisteners[eventType] = this._listenWithCallback(
						eventType,
						callback,
						options
					)
				}
			}
		}

		return () => {
			for (const eventName in unlisteners) {
				const unlisten = unlisteners[eventName]
				delete unlisteners[eventName]
				unlisten()
			}
		}
	}

	_listenWithCallback(type, callback, options) {
		this.dom.addEventListener(type, callback, options)
		return () => this.dom.removeEventListener(type, callback, options)
	}
}

function isObject(v) {
	return v !== null && typeof v === 'object' && !Array.isArray(v)
}
