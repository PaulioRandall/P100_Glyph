import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import CanvasEvents from './CanvasEvents.js'

export default class Canvas {
	constructor(container) {
		const two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
		}).appendTo(container)

		const stage = two.makeGroup()
		const zui = new ZUI(stage)

		this._container = container
		this._two = two
		this._stage = stage
		this._zui = zui

		this._canvasEvents = new CanvasEvents(this)
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

	get dom() {
		return this.two.renderer.domElement
	}

	add(element) {
		this.stage.add(element)
	}

	remove(element) {
		this.stage.remove(element)
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
