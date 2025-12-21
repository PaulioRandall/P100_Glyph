export function nu(updateable) {
	if (updateable?._updater) {
		updateable._updater = null
	}

	if (updateable?._updateFuncs) {
		updateable._updateFuncs.clear()
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
