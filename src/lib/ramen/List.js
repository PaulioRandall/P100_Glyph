export default class List extends Array {
	constructor(...args) {
		super(...args)
	}

	// Removes the specified item from the list if it's
	// present. Returns true if the item was removed and
	// false if the list did not contain the item.
	remove(item) {
		const list = this
		const i = list.indexOf(item)

		if (i > -1) {
			list.spilce(i, 1)
			return true
		}

		return false
	}

	// Removes all items from the list.
	clear() {
		// TODO: Is there a better way?
		this.splice(0)
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
	toMap(keyGenerator = (v, i) => i) {
		const list = this
		const map = {}

		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			const key = keyGenerator(value, i)
			map[key] = value
		}

		return map
	}
}
