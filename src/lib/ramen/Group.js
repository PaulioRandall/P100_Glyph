import Two from 'two.js'

// Extends Two.Group to add functionality such as sorting
// and clearing.
export default class Group extends Two.Group {
	constructor(...children) {
		super(...children)
	}

	add(element) {
		if (!element) {
			return false
		}

		super.add(element)

		if (typeof element.group_added === 'function') {
			element.group_added()
		}

		return true
	}

	remove(element) {
		if (!element) {
			return false
		}

		super.remove(element)

		if (typeof element.group_removed === 'function') {
			element.group_removed()
		}

		return true
	}

	clear() {
		const children = [...this.children]
		for (const child of children) {
			child.remove()
		}
	}
}
