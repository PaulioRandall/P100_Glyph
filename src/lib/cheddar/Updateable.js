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
	_notifier = this.updated.bind(this)
	_listeners = new List()
	_muted = false

	// Returns the notifier function that calls update with
	// this object bound.
	//
	// The same underlying function is returned so can be
	// easily used with tools that allow registering and
	// unregistering of callbacks, e.g. DOM events.
	get notifier() {
		return this._notifier
	}

	// Returns true if notifications are not being sent
	// for updates.
	get muted() {
		return this._muted
	}

	// Registers a function that is called when an updateable
	// part of the object is updated.
	onUpdate(func) {
		if (typeof func !== 'function') {
			throw new Error('Not a function')
		}

		this._listeners.push(func)
		return () => this.offUpdate(func)
	}

	// Unregisters a function registered throught onUpdate.
	offUpdate(func) {
		this._listeners.remove(func)
	}

	// Prevents notifications from being sent on update.
	//
	// Useful when applying bulk changes. Don't forget to
	// unmute and call updated after applying changes!
	mute() {
		this._muted = true
	}

	// Enables notification on update, if not already
	// enabled.
	unmute() {
		this._muted = false
	}

	// Mutes updates, invokes the function, then unmutes.
	doMuted(func, ...args) {
		this._muted = true
		func(...args)
		this._muted = false
	}

	// Notifies any registered listeners that a change has
	// been made.
	//
	// You should only call this function yourself if you
	// want to refresh content as if an update occurred.
	//
	// Beware: if overriding this function then always call
	// super method to notify listeners.
	updated() {
		if (!this._muted) {
			this._listeners.forEach((f) => f(this))
		}
	}
}
