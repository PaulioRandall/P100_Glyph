import Two from 'two.js'

export default class Feature {
	_group = new Two.Group()

	get group() {
		return this._group
	}
}
