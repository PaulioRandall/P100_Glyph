// Extends Array to add utility functions.
export default class List extends Array {
	// Returns a new list populated with the content of the
	// iterable parameter.
	static from(iterable = []) {
		const list = new List()
		list.push(...iterable)
		return list
	}

	// Returns true if the index is an accessible list item.
	//
	// If includeLength is true, will also return true if the
	// index is equal to the length.
	static withinRange(array, index, includeLength = false) {
		return (
			(index >= 0 && //
				index < array.length) || //
			(includeLength && index === array.length)
		)
	}

	// Return the index of the item second from last. The
	// number will be negative if list length is less than
	// 2.
	static beforeLastIndex(array) {
		return array.length - 2
	}

	// Return the second from last item. Null if no such
	// item.
	static beforeLast(array) {
		const i = List.beforeLastIndex(array)
		return i < 0 ? null : array[i]
	}

	// Return the index of the last item. The number will be
	// negative if list is empty.
	static lastIndex(array) {
		return array.length - 1
	}

	// Return the last item. Null if no such item.
	static last(array) {
		const i = List.lastIndex(array)
		return i < 0 ? null : array[i]
	}

	// Return the item before the reference item. Null if no
	// such item.
	static itemBefore(array, refItem) {
		const i = array.indexOf(refItem)
		return i <= 0 ? null : array[i - 1]
	}

	// Return the item after the reference item. Null if no
	// such item.
	static itemAfter(array, refItem) {
		const i = array.indexOf(refItem)
		const lastIndex = List.lastIndex(array)
		return i < 0 || i >= lastIndex ? null : array[i + 1]
	}

	// Insert an item at the index location.
	//
	// An exception is thrown if the index is out of range.
	static insert(array, index, item) {
		if (!List.withinRange(array, index, true)) {
			throw new Error('Index is out of range')
		}

		array.splice(index, 0, item)
	}

	// Insert an item before another item. If the reference
	// item doesn't exist an exception is thrown.
	static insertBefore(array, refItem, item) {
		const i = array.indexOf(refItem)

		if (i < 0) {
			throw new Error("Reference item doesn't exist")
		}

		array.splice(i, 0, item)
	}

	// Insert an item after another item. If the reference
	// item doesn't exist an exception is thrown.
	static insertAfter(array, refItem, item) {
		const i = array.indexOf(refItem)

		if (i < 0) {
			throw new Error("Reference item doesn't exist")
		}

		array.splice(i + 1, 0, item)
	}

	// Replace an existing item with a new item. If the
	// current item doesn't exist it is appended to the list.
	// If the current item doesn't exist an exception is
	// thrown.
	static replace(array, currentItem, newItem) {
		const i = array.indexOf(currentItem)

		if (i < 0) {
			throw new Error("Current item doesn't exist")
		}

		array.splice(i, 1, newItem)
	}

	// Find and remove the item if it exists.
	static remove(array, item) {
		const i = array.indexOf(item)

		if (i > -1) {
			array.splice(i, 1)
		}
	}

	// Remove all items.
	static clear(array) {
		array.splice(0)
	}

	// Iterates the list calling all callable items with
	// the passed arguments. Callable items are those that
	// return true for `typeof item === 'function'`.
	static callAll(array, ...args) {
		array.forEach((item) => {
			if (typeof item === 'function') {
				item(...args)
			}
		})
	}

	withinRange(index, includeLength = false) {
		return List.withinRange(this, index, includeLength)
	}

	beforeLastIndex() {
		return List.beforeLastIndex(this)
	}

	beforeLast() {
		return List.beforeLast(this)
	}

	lastIndex() {
		return List.lastIndex(this)
	}

	last() {
		return List.last(this)
	}

	itemBefore(refItem) {
		return List.itemBefore(this, refItem)
	}

	itemAfter(refItem) {
		return List.itemAfter(this, refItem)
	}

	insert(index, item) {
		List.insert(this, index, item)
	}

	insertBefore(refItem, item) {
		List.insertBefore(this, refItem, item)
	}

	insertAfter(refItem, item) {
		List.insertAfter(this, refItem, item)
	}

	replace(currentItem, newItem) {
		List.replace(this, currentItem, newItem)
	}

	remove(item) {
		List.remove(this, item)
	}

	clear() {
		List.clear(this)
	}

	callAll(...args) {
		List.callAll(this, ...args)
	}
}
