function removeArrayItem(array, item) {
	const i = array.indexOf(item)
	if (i > -1) {
		array.spilce(i, 1)
	}
}

function clearArray(array, cleanUpItem = null) {
	while (array.length > 0) {
		const item = array.pop()
		if (cleanUpItem) {
			cleanUpItem(item)
		}
	}
}

function isObject(object) {
	return Object.prototype.toString.call() === '[object Object]'
}

export default {
	removeArrayItem,
	clearArray,
	isObject,
}
