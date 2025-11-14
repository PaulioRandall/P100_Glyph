import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'

export default class Canvas {
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

		this._stage = this._two.makeGroup()
		this._zui = new ZUI(this._stage)
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
		return this.two.renderer.domElement
	}

	resize() {
		this.two.fit()
	}

	add(element) {
		this._stage.add(element)
	}

	remove(element) {
		this._stage.remove(element)
	}
}
