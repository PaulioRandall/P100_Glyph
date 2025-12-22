import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'
import DirtyMap from './DirtyMap.js'

// Classes extending Elemental map to a single HTML
// element.
export default class Elemental extends Updateable {
	_element = null
	_attrs = new DirtyMap()
	_style = new DirtyMap()

	// Arguments:
	// [0]: element (optional)
	constructor(element = null) {
		super()

		this._element = element
		this._attrs.onUpdate(this.updater)
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

	get style() {
		return this._style
	}

	get attributes() {
		return this._attrs
	}

	// Shortcut for adding itself to a group.
	addTo(group) {
		group.add(this)
		return this
	}

	// Always true.
	canTranslate() {
		return false
	}

	update() {
		if (!this._attrs.val('id')) {
			this._attrs.nuSet('id', randomId())
		}

		if (!this.element) {
			super.update()
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
		this._attrs.nuClean()

		// TODO: Tidy
		if (this._style.isDirty()) {
			const style = this._style
				.map(([k, v]) => `${k}: ${v};`) //
				.join('') //
			this.element.setAttribute('style', style)
		}
		this._attrs.nuClean()

		super.update()
	}

	_setElement(element) {
		this._element = element
	}
}
