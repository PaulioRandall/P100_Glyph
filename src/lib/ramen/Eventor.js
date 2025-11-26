import Util from './Util.js'

// IDEA: Intead of binding, could pass an object that has
//       functions like '_event_mousedown'. Listeners and
//       unlisteners are created for these functions with
//       the object as binding (allowing this keyword to
//       function as normal).

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

		this._unlisteners.push(() => {
			const removed = Util.removeArrayItem(this._unlisteners, unlisten)
			if (removed) {
				unlisten()
			}
		})

		return unlisten
	}

	free() {
		this._unlisteners.forEach((ul) => ul())
	}
}

function doBind(callback, binding) {
	if (typeof binding === 'undefined') {
		return callback
	}
	return callback.bind(binding)
}
