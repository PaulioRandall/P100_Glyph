import List from './List.js'

// Intended for extension by objects that update when
// specific parts of their state change.
//
// Listeners can be registered to be informed when an
// update occurs. The listeners are called in the order
// they are registered.
//
// If overriding the update or notify methods, always call
// the super method so updates are made and listeners are
// notified.
export default class Updateable {
	_updateFuncs = new List()

	// Registers a function that is called when an updateable
	// part of the object is updated.
	onUpdate(func) {
		if (typeof func !== 'function') {
			throw new Error('Not a function')
		}

		this._updateFuncs.push(func)
		return () => this.offUpdate(func)
	}

	// Unregisters a function registered throught onUpdate.
	offUpdate(func) {
		this._updateFuncs.remove(func)
	}

	// Updates the internal state of the object then notifies
	// any registered listeners. It also notify onUpdate and
	// onNotify functions.
	//
	// You should only call this function yourself if you
	// want to refresh content as if an update occurred.
	//
	// By default it does nothing except call updater and
	// notifier functions.
	update() {
		this.notify()
	}

	// Notify listeners that an update has occurred, or
	// at least invoke actions that are performed when an
	// update occurs.
	notify() {
		this._updateFuncs.forEach((f) => f(this))
	}
}
