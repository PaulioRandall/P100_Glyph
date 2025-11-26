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

		if (typeof element.added === 'function') {
			element.added()
		}
	}

	remove(element) {
		if (!element) {
			return
		}

		super.remove(element)

		if (typeof element.removed === 'function') {
			element.removed()
		}
	}

	clear() {
		const children = [...this.children]
		for (const child of children) {
			child.remove()
		}
	}
}
