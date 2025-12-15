import List from './List.js'

// Intended for extension by objects that update when
// specific parts of their state change.
//
// Listeners can be registered to be informed when an
// update occurs. The listeners are called in the order
// they are registered.
//
// If overriding the update method, always call the super
// method so other updates occur and listeners are
// notified after all updates.
export default class Updateable {
	_updaters = new List()

	// Registers a function that is called when an updateable
	// part of the object is updated.
	onUpdate(func) {
		if (typeof func !== 'function') {
			throw new Error('Not a function')
		}

		this._updaters.push(func)
		return () => this.offUpdate(func)
	}

	// Unregisters a function registered throught onUpdate.
	offUpdate(func) {
		this._updaters.remove(func)
	}

	// Updates the internal state of the object then notifies
	// any registered listeners.
	//
	// By default it does nothing except call notify.
	update() {
		this.notify()
	}

	// Notify listeners that an update has occurred. Called
	// by default by the update function. You should only
	// call this function yourself if you want listeners to
	// refresh as if an update occurred.
	notify() {
		this._updaters.forEach((f) => f())
	}
}
