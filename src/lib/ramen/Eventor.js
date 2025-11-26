export default class Eventor {
	_canvas = null
	_binding = null
	_unlisteners = []

	constructor(canvas, binding) {
		this._canvas = canvas
		this._binding = binding
	}

	listen(type, callback, options) {
		const thunk = doBind(callback, this._binding)
		return this._listen(type, thunk, options)
	}

	_listen(type, callback, options) {
		const unlisten = this._canvas.listen(type, callback, options)
		this._unlisteners.push(unlisten)
		return unlisten
	}

	free() {
		while (this._unlisteners.length > 0) {
			const unlisten = this._unlisteners.pop()
			unlisten()
		}
	}
}

function doBind(callback, binding) {
	if (typeof binding === 'undefined') {
		return callback
	}
	return callback.bind(binding)
}
