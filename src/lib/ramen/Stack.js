import Two from 'two.js'
import TwoComponent from './TwoComponent.js'

export default class Stack {
	_base = new TwoComponent()
	_components = []

	get length() {
		return this._components.length
	}

	get components() {
		return [...this._components]
	}

	// Adds the component to the top of the stack.
	// The component will be rendered above all others.
	addToTop(component, offset = 0) {
		this._insert(component, offset)
	}

	// Adds the component to the bottom of the stack.
	// The component will be rendered below all others.
	addToBottom(component, offset = 0) {
		this._insert(component, this.length - offset)
	}

	// Removes the specified component, if it's present.
	//
	// TODO Can the same item be added multiple times?
	remove(component) {
		this._remove(component)
	}

	_insert(component, index) {
		checkComponent(component)

		const components = this._components

		if (index < 0) {
			index = 0
		} else if (index > components.length) {
			index = components.length
		}

		components.splice(index, 0, component)
		this._base.insertComponent(index, 0, component)
	}

	_remove(component) {
		checkComponent(component)

		const i = this._indexOf(component)

		if (i !== -1) {
			this._base.removeComponent(component)
			this._components.splice(i, 1)
		}
	}

	_indexOf(component) {
		for (let i = 0; i < this._components.length; i++) {
			if (c === component) {
				return i
			}
		}

		return -1
	}

	_itemAt(index) {
		if (index < 0) {
			return null
		}

		if (index >= this._components.length) {
			return null
		}

		return this._components[0]
	}
}

function checkComponent(component) {
	if (!component._base) {
		throw new Error('Not a valid component')
	}
}
