import Updateable from './Updateable.js'

// DirtyMap keeps track of entries that have changed
// so user devs can optimise updates.
export default class DirtyMap extends Updateable {
	_map = new Map()
	_dirty = new Set()

	// Returns true if the name exists within the map.
	has(name) {
		return this._map.has(name)
	}

	// Gets a value from the map, or undefined if no value
	// exists.
	get(name) {
		return this._map.get(name)
	}

	// set without calling update.
	nuSet(name, value) {
		return this.nuPut(name, value, true)
	}

	// Puts a value into the map and always sets the name as
	// dirty.
	set(name, value) {
		return this.put(name, value, true)
	}

	// put without calling update.
	nuPut(name, value, forceDirty = false) {
		const change = this.willDirty(name, value)

		if (change) {
			this._map.set(name, value)
		}

		if (forceDirty || change) {
			this._dirty.add(name)
		}

		return this
	}

	// Puts a value into the map. The name is set as dirty
	// unless the value is equal to the existing value and
	// forceDirty is false.
	put(name, value, forceDirty = false) {
		const change = this.willDirty(name, value)

		if (change) {
			this._map.set(name, value)
		}

		if (forceDirty || change) {
			this._dirty.add(name)
			this.update()
		}

		return this
	}

	// val without calling update.
	nuVal(name, value = undefined, forceDirty = false) {
		if (value === undefined) {
			return this.get(name)
		}
		return this.nuPut(name, value, forceDirty)
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

	// del without calling update.
	nuDel(name) {
		if (this._map.has(name)) {
			this._dirty.add(name)
			this._map.delete(name)
		}
		return this
	}

	// Deletes an entry if it exists. Causes the name to be
	// entered into the dirty map if a deletion occurred.
	del(name) {
		if (this._map.has(name)) {
			this._dirty.add(name)
			this._map.delete(name)
			this.update()
		}
		return this
	}

	// Returns true if the name is dirty.
	isDirty(name) {
		return this._dirty.has(name)
	}

	// Returns true if putting this name value pair will
	// cause the name to be become dirty.
	willDirty(name, value) {
		return !this._map.has(name) || this._map.get(name) !== value
	}

	// dirty without calling update.
	nuDirty(name) {
		this._dirty.add(name)
		return this
	}

	// Sets a name as dirty. Name does not have to be in the
	// map itself.
	dirty(name) {
		this.nuDirty(name)
		this.update()
		return this
	}

	// Returns an array of all dirty names.
	listDirty() {
		return [...this._dirty]
	}

	// clean without calling update.
	nuClean() {
		this._dirty.clear()
		return this
	}

	// Removes all names from the dirty list.
	clean() {
		this.nuClean()
		this.update()
		return this
	}
}
