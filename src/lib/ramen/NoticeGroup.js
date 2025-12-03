import BaseGroup from './BaseGroup.js'

// Extends BaseGroup by calling '__group__added' and
// '__group__removed' functions on elements added and
// removed from itself.
export default class NoticeGroup extends BaseGroup {
	add(element) {
		if (!element) {
			return false
		}

		super.add(element)

		if (typeof element.__group__added === 'function') {
			element.__group__added()
		}

		return true
	}

	remove(element) {
		if (!element) {
			return false
		}

		super.remove(element)

		if (typeof element.__group__removed === 'function') {
			element.__group__removed()
		}

		return true
	}
}
