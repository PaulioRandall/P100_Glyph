import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Group from './Group.js'
import Store from './Store.js'

export default class Canvas {
	_container
	_two
	_stage
	_zui
	_store = new Store()

	_loaders = [] // (canvas) => Unloader
	_unloaders = [] // (canvas) => {}

	constructor(container, twoOptions = {}) {
		this._container = container

		this._two = new Two({
			type: Two.Types.svg,
			fitted: true,
			autostart: true,
			...twoOptions,
		}).appendTo(container)

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

	get width() {
		return this._two.width
	}

	get height() {
		return this._two.height
	}

	get store() {
		return this._store
	}

	onload(load) {
		this._loaders.push(load)
		this._doLoad(load)
	}

	load() {
		this.reload()
	}

	reload() {
		this._unloadAll()

		this._two.clear()
		this._stage = new Group()
		this._two.add(this._stage)
		this._zui = new ZUI(this._stage)

		this._loadAll()
	}

	unload() {
		this._unloadAll()
	}

	_doLoad(load) {
		const unload = load(this)

		if (unload) {
			this._unloaders.push(unload)
		}
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
