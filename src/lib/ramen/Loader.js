export default class Loader {
	_context = null
	_loaders = [] // (canvas) => Unloader
	_unloaders = [] // (canvas) => {}

	constructor(context) {
		this._context = context
	}

	load(loadFunc) {
		this._loaders.push(loadFunc)
		this._doLoad(loadFunc)
	}

	reload(initLoader) {
		this._unloadAll()
		this._loadAll()
	}

	free() {
		this._unloadAll()
	}

	_doLoad(loadFunc) {
		const unloader = loadFunc(this._context)

		if (unloader) {
			this._unloaders.push(unloader)
		}
	}

	_unloadAll() {
		while (this._unloaders.length > 0) {
			const unloadFunc = this._unloaders.pop()
			unloadFunc(this._context)
		}
	}

	_loadAll() {
		for (const loadFunc of this._loaders) {
			this._doLoad(loadFunc)
		}
	}
}
