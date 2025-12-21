export function nu(updateable) {
	updateable._updater = null
	updateable._updateFuncs.clear()
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
