import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import CanvasEvents from './CanvasEvents.js'
import Stack from './Stack.js'

export default class Canvas extends Stack {
	_container;
	_two;
	_stage;
	_zui;

	constructor(container) {
		super()

		this._container = container

		this._two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
		}).appendTo(container)

		this._stage = this._two.makeGroup(this._base._twoGroup)
		this._zui = new ZUI(this._stage)

		this._canvasEvents = new CanvasEvents(this)
	}

	// Stack.addToTop(component, offset)
	// Stack.addToBottom(component, offset)
	// Stack.remove(component)

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
		return this.two.renderer.domElement
	}

	resize() {
		this.two.fit()
	}

	onCursorMove(func) {
		this._canvasEvents.onCursorMove(func)
	}

	offCursorMove(func) {
		this._canvasEvents.offCursorMove(func)
	}

	onEvent(type, listener, options = { capture: false }) {
		this._canvasEvents.onEvent(type, listener, options)
	}
}
