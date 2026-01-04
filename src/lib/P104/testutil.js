import ArrayUtil from '../P101'

export function nu(updateable) {
	if (updateable?._notifier) {
		updateable._notifier = null
	}

	if (updateable?._listeners) {
		ArrayUtil.clear(updateable._listeners)
	}

	return updateable
}

export function expectUpdateable(act, exp) {
	expect(nu(act)).toEqual(nu(exp))
}

export function expectUpdateables(act, exp) {
	act.forEach(nu)
	exp.forEach(nu)
	expect(act).toEqual(exp)
}
