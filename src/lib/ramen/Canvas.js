import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Group from './Group.js'

export default class Canvas {
	_container
	_two
	_stage
	_zui

	_isInit = false

	_loaders = [] // (canvas) => Unloader
	_unloaders = [] // (canvas) => {}

	init(container, twoOptions = {}) {
		this._container = container

		this._two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
			...twoOptions,
		}).appendTo(this._container)

		this._isInit = true
		this.reload()
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

	get initialised() {
		return this._isInit
	}

	get width() {
		return this._two.width
	}

	get height() {
		return this._two.height
	}

	onload(load) {
		this._loaders.push(load)

		if (this._isInit) {
			this._doLoad(load)
		}
	}

	_doLoad(load) {
		const unload = load(this)

		if (unload) {
			this._unloaders.push(unload)
		}
	}

	reload() {
		if (!this._isInit) {
			return
		}

		this._unloadAll()

		this._two.clear()
		this._stage = new Group()
		this._zui = new ZUI(this._stage)

		this._two.add(this._stage)

		this._loadAll()
	}

	_unloadAll() {
		while (this._unloaders.length > 0) {
			const unload = this._unloaders.pop()
			unload(this)
		}
	}

	_loadAll() {
		for (const load of this._loaders) {
			this._doLoad(load)
		}
	}

	add(element) {
		this._stage.add(element)
	}

	remove(element) {
		this._stage.remove(element)
	}

	clear() {
		this._stage.clear()
		super.clear()
	}
}
