import CanvasGroup from './CanvasGroup.js'
import Moonfire from '$moonfire'

export default class EventGroup extends CanvasGroup {
	_unlisteners = []

	constructor(...args) {
		super(...args)
	}

	__when__added_to_group() {
		this._addObjectListeners()
	}

	__when__removed_from_group() {
		this._removeObjectListeners()
	}

	_addObjectListeners() {
		const funcs = Moonfire.match(this, /__on__*/)
		this._unlisteners = funcs.map(addEventListener.bind(this))
	}

	_removeObjectListeners() {
		while (this._unlisteners.length > 0) {
			this._unlisteners[0]()
			this._unlisteners.pop()
		}
	}
}

function addEventListener({ name, func, context }) {
	const eventType = name.slice('__on__'.length)
	const callback = func.bind(context)
	return this.canvas.on(eventType, callback)
}
