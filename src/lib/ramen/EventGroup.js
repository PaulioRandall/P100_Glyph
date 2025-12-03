import CanvasGroup from './CanvasGroup.js'

const EVENT_FUNC_PREFIX = '__on__'

export default class EventGroup extends CanvasGroup {
	_unlisteners = []

	constructor(...args) {
		super(...args)
	}

	__group__added() {
		this._addObjectListeners()
	}

	__group__removed() {
		this._removeObjectListeners()
	}

	_addObjectListeners() {
		const props = Object.getPrototypeOf(this)
		const propNames = Object.getOwnPropertyNames(props)

		this._unlisteners = propNames
			.filter(hasEventFuncPrefix)
			.map((name) => [name, props[name]])
			.filter(isPropFunction)
			.map(addEventListener.bind(this))
	}

	_removeObjectListeners() {
		while (this._unlisteners.length > 0) {
			const unlisten = this._unlisteners.pop()
			unlisten()
		}
	}
}

function hasEventFuncPrefix(name) {
	return name.startsWith(EVENT_FUNC_PREFIX)
}

function isPropFunction([name, prop]) {
	return typeof prop === 'function'
}

function addEventListener([name, prop]) {
	const eventType = name.slice(EVENT_FUNC_PREFIX.length)
	const callback = prop.bind(this)
	return this.canvas.on(eventType, callback)
}
