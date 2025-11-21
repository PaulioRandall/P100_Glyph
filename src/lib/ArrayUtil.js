// TODO: Tests
function remove(array, item) {
	const i = array.indexOf(item)
	if (i > -1) {
		array.spilce(i, 1)
	}
}

function removeAll(array, cleanUpItem = null) {
	while (array.length > 0) {
		const item = array.pop()
		if (cleanUpItem) {
			cleanUpItem(item)
		}
	}
}

function walkGrid(numOfCols, numOfRows = null, cellInit = null) {
	if (!numOfRows) {
		numOfRows = numOfCols
	}

	for (let row = 0; row < numOfRows; row++) {
		for (let col = 0; col < numOfCols; col++) {
			if (cellInit) {
				cellInit(col, row)
			}
		}
	}
}

export default {
	remove,
	removeAll,
	walkGrid,
}
