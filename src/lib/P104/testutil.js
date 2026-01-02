export function nu(updateable) {
	if (updateable?._notifier) {
		updateable._notifier = null
	}

	if (updateable?._listeners) {
		updateable._listeners.clear()
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
