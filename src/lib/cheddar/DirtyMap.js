import Updateable from './Updateable.js'

// DirtyMap keeps track of entries that have changed
// so user devs can optimise updates.
export default class DirtyMap extends Updateable {
	_map = new Map()
	_dirty = new Set()

	// Arguments:
	// [0] an object whose own properties shown be added to
	//     the map.
	constructor(obj = {}) {
		super()
		this._putProps(obj)
	}

	// Returns true if the name exists within the map.
	has(name) {
		return this._map.has(name)
	}

	// Gets a value from the map, or undefined if no value
	// exists.
	get(name) {
		return this._map.get(name)
	}

	// Puts a value into the map and always sets the name as
	// dirty.
	set(name, value) {
		return this.put(name, value, true)
	}

	// Puts a value into the map. The name is set as dirty
	// unless the value is equal to the existing value and
	// forceDirty is false.
	put(name, value, forceDirty = false) {
		if (this._put(name, value, forceDirty)) {
			this.updated()
		}

		return this
	}

	_put(name, value, forceDirty = false) {
		const changed = this.willDirty(name, value)

		if (changed) {
			this._map.set(name, value)
		}

		if (forceDirty || changed) {
			this._dirty.add(name)
			return true
		}

		return false
	}

	// Puts a value into the map only if the name is not
	// a key currently in the map.
	putMissing(name, value) {
		if (!this._map.has(name)) {
			this.put(name, value)
		}

		return this
	}

	// Puts all enumerable own properties of the object into
	// the map. Triggers a single update notification.
	putProps(obj) {
		if (this._putProps(obj)) {
			this.updated()
		}

		return this
	}

	_putProps(obj) {
		const names = Object.getOwnPropertyNames(obj)
		let changed = false

		for (const n of names) {
			changed = this._put(n, obj[n], false) || changed
		}

		return changed
	}

	// If value is undefined, then returns the result of the
	// 'get' function. If value is defined, then this calls
	// the 'put' function.
	val(name, value = undefined, forceDirty = false) {
		if (value === undefined) {
			return this.get(name)
		}
		return this.put(name, value, forceDirty)
	}

	// Deletes an entry if it exists. Causes the name to be
	// entered into the dirty map if a deletion occurred.
	del(name) {
		if (this._map.has(name)) {
			this._dirty.add(name)
			this._map.delete(name)
			this.updated()
		}
		return this
	}

	// Returns the underlying map entries.
	map(f) {
		const result = []

		for (const entry of this._map.entries()) {
			result.push(f(entry))
		}

		return result
	}

	// Returns true if the name is dirty.
	isDirty(name = undefined) {
		if (name === undefined) {
			return this._dirty.size > 0
		}
		return this._dirty.has(name)
	}

	// Returns true if putting this name value pair will
	// cause the name to be become dirty.
	willDirty(name, value) {
		return !this._map.has(name) || this._map.get(name) !== value
	}

	// Sets a name as dirty. Name does not have to be in the
	// map itself.
	dirty(name) {
		this._dirty.add(name)
		this.updated()
		return this
	}

	// Returns an array of all dirty names.
	listDirty() {
		return [...this._dirty]
	}

	// Removes all names from the dirty list.
	clean() {
		this._dirty.clear()

		for (const [name, value] of this._map.entries()) {
			if (value === undefined) {
				this._map.delete(name)
			}
		}

		this.updated()
		return this
	}
}
