import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Stack from './Stack.js'

export default class Canvas extends Stack {
	_container
	_two
	_stage
	_zui

	constructor(container) {
		this._container = container

		this._two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
		}).appendTo(container)

		this._stage = two.makeGroup(this._base._twoGroup)
		this._zui = new ZUI(stage)
	}

	get container() {
		return this._container
	}

	get two() {
		return this._two
	}

	get stage() {
		return this._stage
	}

	get zui() {
		return this._zui
	}

	// Stack.addToTop(component, offset)
	// Stack.addToBottom(component, offset)
	// Stack.remove(component)

	resize() {
		this.two.fit()
	}

	addEvent(type, listener, options = {}) {
		const op = options

		this.two.renderer.domElement.addEventListener(type, listener, op)

		return () => {
			this.two.renderer.domElement.removeEventListener(type, listener, op)
		}
	}
}
