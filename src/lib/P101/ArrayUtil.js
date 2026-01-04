// Returns true if the index is an accessible list item.
//
// If includeLength is true, will also return true if the
// index is equal to the length.
export function withinRange(array, index, includeLength = false) {
	return (
		(index >= 0 && index < array.length) || //
		(includeLength && index === array.length)
	) //
}

// Return the index of the item second from last. The
// number will be negative if list length is less than
// 2.
export function beforeLastIndex(array) {
	return array.length - 2
}

// Return the second from last item. Null if no such
// item.
export function beforeLast(array) {
	const i = beforeLastIndex(array)
	return i < 0 ? null : array[i]
}

// Return the index of the last item. The number will be
// negative if list is empty.
export function lastIndex(array) {
	return array.length - 1
}

// Return the last item. Null if no such item.
export function last(array) {
	const i = lastIndex(array)
	return i < 0 ? null : array[i]
}

// Return the item before the reference item. Null if no
// such item.
export function itemBefore(array, refItem) {
	const i = array.indexOf(refItem)
	return i <= 0 ? null : array[i - 1]
}

// Return the item after the reference item. Null if no
// such item.
export function itemAfter(array, refItem) {
	const i = array.indexOf(refItem)
	const lastIdx = lastIndex(array)
	return i < 0 || i >= lastIdx ? null : array[i + 1]
}

// Insert an item at the index location.
//
// An exception is thrown if the index is out of range.
export function insert(array, index, item) {
	if (!withinRange(array, index, true)) {
		throw new Error('Index is out of range')
	}

	array.splice(index, 0, item)
}

// Insert an item before another item. If the reference
// item doesn't exist an exception is thrown.
export function insertBefore(array, refItem, item) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw new Error("Reference item doesn't exist")
	}

	array.splice(i, 0, item)
}

// Insert an item after another item. If the reference
// item doesn't exist an exception is thrown.
export function insertAfter(array, refItem, item) {
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
export function replace(array, currentItem, newItem) {
	const i = array.indexOf(currentItem)

	if (i < 0) {
		throw new Error("Current item doesn't exist")
	}

	array.splice(i, 1, newItem)
}

// Find and remove the item if it exists.
export function remove(array, item) {
	const i = array.indexOf(item)

	if (i > -1) {
		array.splice(i, 1)
	}
}

// Remove all items.
export function clear(array) {
	array.splice(0)
}

// Iterates the list calling all callable items with
// the passed arguments. Callable items are those that
// return true for `typeof item === 'function'`.
export function callAll(array, ...args) {
	array.forEach((item) => {
		if (typeof item === 'function') {
			item(...args)
		}
	})
}

// Utility functions for dealing with arrays.
export default {
	withinRange, //
	beforeLastIndex,
	beforeLast,
	lastIndex,
	last,
	itemBefore,
	itemAfter,
	insert,
	insertBefore,
	insertAfter,
	replace,
	remove,
	clear,
	callAll,
}
