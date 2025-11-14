import Two from 'two.js'

export default class TwoComponent {
	_twoGroup = new Two.Group()

	insertShape(twoShape, index) {
		// This wont work. Try sorting instead
		this._twoGroup.children.splice(index, 0, twoShape)
	}

	removeShape(twoShape) {
		this._twoGroup.remove(twoShape)
	}

	insertComponent(component, index) {
		this.insertShape(component._twoGroup, index)
	}

	removeComponent(component) {
		this.removeShape(component._twoGroup)
	}
}
