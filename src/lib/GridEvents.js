/*
	console.table({
		page: {
			x: e.pageX,
			y: e.pageY,
		},
		screen: {
			x: e.screenX,
			y: e.screenY,
		},
		layer: {
			x: e.layerX,
			y: e.layerY,
		},
		client: {
			x: e.clientX,
			y: e.clientY,
		},
		offset: {
			x: e.offsetX,
			y: e.offsetY,
		},
	})
*/

// TODO: REWRITE!!!!
export default class CanvasEvents {
	_canvas

	// Thunks which remove event listeners on call.
	_unregisters = [
		/* () => {} */
	]

	// User functions called when the cursor is moved.
	_onMoveFuncs = [
		/* (event, canvas) => {} */
	]

	constructor(canvas) {
		this._canvas = canvas
		this.load()
	}

	load() {
		const canvas = this._canvas
		this.unload()

		const cursorMovement = (e) => {
			this._onMoveFuncs.forEach((f) => f(e))
		}

		this._add('mousemove', cursorMovement)
	}

	_add(type, func) {
		const unregister = this.onEvent(type, func)
		this._unregisters.push(unregister)
	}

	unload() {
		for (const f of this._unregisters) {
			f()
		}

		this._unregisters.splice(0)
	}

	onEvent(type, func, options = { capture: false }) {
		const op = structuredClone(options)
		const dom = this._canvas.dom

		dom.addEventListener(type, func, op)

		return () => {
			dom.removeEventListener(type, func, op)
		}
	}

	onCursorDown(f, keys = null) {
		// TODO when
	}

	// Called when the cursor is moved. This could be mouse, touchscreen,
	// trackpad, or any other type of pointer movement.
	onCursorMove(f) {
		this._onMoveFuncs.push(f)
	}

	offCursorMove(f) {
		const funcs = this._onMoveFuncs
		const i = funcs.indexOf(f)

		if (i !== -1) {
			funcs.splice(i, 1)
		}
	}
}
