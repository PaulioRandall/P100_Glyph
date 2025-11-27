import Two from 'two.js'

// Extends Two.Group to add functionality such as sorting
// and clearing.
export default class Group extends Two.Group {
	constructor(...children) {
		super(...children)
	}

	add(element) {
		if (!element) {
			return
		}

		super.add(element)

		if (typeof element._group_added === 'function') {
			element._group_added()
		}
	}

	remove(element) {
		if (!element) {
			return
		}

		super.remove(element)

		if (typeof element._group_removed === 'function') {
			element._group_removed()
		}
	}

	listen(canvas, typeOfObject, callbackOrOptions, options) {
		// TODO
	}

	clear() {
		const children = [...this.children]
		for (const child of children) {
			child.remove()
		}
	}

	free() {
		this.clear()
	}
}
