import Two from 'two.js'
import { ZUI } from 'two.js/extras/jsm/zui.js'
import Group from './Group.js'
import Store from './Store.js'
import Eventor from './Eventor.js'

export default class Canvas {
	_container
	_two
	_stage
	_zui
	_store = new Store()

	_loaders = [] // (canvas) => Unloader
	_unloaders = [] // (canvas) => {}

	// TODO: this class could extend Group to become the stage?

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

	dispatch(type, detail = {}) {
		const event = new CustomEvent(type, {
			bubbles: false,
			cancelable: false,
			detail,
		})

		return this.dom.dispatchEvent(event)
	}

	listen(type, callback, options) {
		this.dom.addEventListener(type, callback, options)
		return () => this.dom.removeEventListener(type, callback, options)
	}

	eventor(binding) {
		return new Eventor(this, binding)
	}

	// class Loadable
	// canvas.loader

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

	free() {
		this.unload()
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
}
