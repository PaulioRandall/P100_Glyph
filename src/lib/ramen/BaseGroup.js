import Two from 'two.js'

// Extends Two.Group to add functionality such as sorting
// and clearing.
export default class BaseGroup extends Two.Group {
	clear() {
		const children = [...this.children]
		for (const child of children) {
			child.remove()
		}
	}
}
