import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'
import DirtyMap from './DirtyMap.js'

// Classes extending Elemental map to a single HTML
// element.
export default class Elemental extends Updateable {
	_element = null
	_attrs = new DirtyMap()
	_styles = new DirtyMap()
	_updating = false

	// Arguments:
	// [0]: element (optional)
	constructor(element = null) {
		super()

		this._element = element
		this._attrs.onUpdate(this.updater)
		this._styles.onUpdate(this.updater)
	}

	get id() {
		return this._attrs.get('id')
	}

	get element() {
		return this._element
	}

	get attrs() {
		return this._attrs
	}

	get styles() {
		return this._styles
	}

	get attributes() {
		return this._attrs
	}

	attr(name, value = undefined) {
		if (value === undefined) {
			return this._attrs.get(name)
		}
		this._attrs.put(name, value)
		return this
	}

	style(name, value = undefined) {
		if (value === undefined) {
			return this._styles.get(name)
		}
		this._styles.put(name, value)
		return this
	}

	// Shortcut for adding itself to a group.
	addTo(group) {
		group.add(this)
		return this
	}

	update() {
		if (this._updating) {
			return
		}

		this._updating = true

		if (!this._attrs.val('id')) {
			this._attrs.set('id', randomId())
		}

		if (!this.element) {
			super.update()
			this._updating = false
			return
		}

		// TODO: Tidy
		for (const name of this._attrs.listDirty()) {
			if (this._attrs.val(name) === undefined) {
				this.element.removeAttribute(name)
			} else {
				const v = this._attrs.val(name)
				this.element.setAttribute(name, v)
			}
		}
		this._attrs.clean()

		// TODO: Tidy
		if (this._styles.isDirty()) {
			const style = this._styles
				.map(([k, v]) => `${k}: ${v};`) //
				.join('') //
			this.element.setAttribute('style', style)
		}
		this._styles.clean()

		super.update()
		this._updating = false
	}

	_setElement(element) {
		this._element = element
	}
}
