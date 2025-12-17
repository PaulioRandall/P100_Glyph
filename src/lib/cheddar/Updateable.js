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
	_notifyFuncs = new List()

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

	// Registers a function that is called when a
	// notification is sent. This includes when an update is
	// made.
	onNotify(func) {
		if (typeof func !== 'function') {
			throw new Error('Not a function')
		}

		this._notifyFuncs.push(func)
		return () => this.offUpdate(func)
	}

	// Unregisters a function registered throught onNotify.
	offNotify(func) {
		this._notifyFuncs.remove(func)
	}

	// Updates the internal state of the object then notifies
	// any registered listeners. It also notify onUpdate and
	// onNotify functions.
	//
	// You should only call this function yourself if you
	// want listeners to refresh as if an update occurred.
	//
	// By default it does nothing except call updater and
	// notifier functions.
	update() {
		this._updateFuncs.forEach((f) => f(this))
		this.notify()
	}

	// Notify listeners that something has changed relating
	// to this object. Sometimes, the object has updated but
	// a call to update is not needed or the change is part
	// of a set of changes being grouped into one update
	// (perhaps for performance).
	notify() {
		this._notifyFuncs.forEach((f) => f(this))
	}
}
