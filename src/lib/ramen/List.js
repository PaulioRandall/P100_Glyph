export default class List extends Array {
	// Removes the specified item from the array if it's
	// present. Returns true if the item was removed and
	// false if the array did not contain the item.
	static remove(array, item) {
		const i = array.indexOf(item)

		if (i > -1) {
			array.splice(i, 1)
			return true
		}

		return false
	}

	// Removes all items from the list.
	static clear(array) {
		array.splice(0)
	}

	// Returns a map (object) of the items.
	//
	// The keyGenerator parameter accepts an item value and
	// its index; its return value is used as the item key.
	//
	// Keys do not have to be unique but non-unique keys will
	// overwrite prior map entries (this is may be useful in
	// some scenarios).
	//
	// If no keyGenerator is passed, item indexes are used as
	// keys.
	static toMap(array, keyGenerator = (v, i) => i) {
		const map = {}

		for (let i = 0; i < array.length; i++) {
			const value = array[i]
			const key = keyGenerator(value, i)
			map[key] = value
		}

		return map
	}

	constructor(...args) {
		super(...args)
	}

	remove(item) {
		return List.remove(this, item)
	}

	clear() {
		List.clear(this)
	}

	toMap(keyGenerator) {
		return List.toMap(this, keyGenerator)
	}
}
