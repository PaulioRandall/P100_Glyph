import BaseGroup from './BaseGroup.js'

// Extends BaseGroup by calling '_group_added' and
// '_group_removed' functions on elements added and removed
// from itself.
export default class NoticeGroup extends BaseGroup {
	add(element) {
		if (!element) {
			return false
		}

		super.add(element)

		if (typeof element._group_added === 'function') {
			element._group_added()
		}

		return true
	}

	remove(element) {
		if (!element) {
			return false
		}

		super.remove(element)

		if (typeof element._group_removed === 'function') {
			element._group_removed()
		}

		return true
	}
}
