import { randomId } from './cheddar.js'
import Updateable from './Updateable.js'
import DirtyMap from './DirtyMap.js'

// Classes extending Elemental map to a single HTML
// element.
export default class Elemental extends Updateable {
	_element = null
	_attrs = new DirtyMap()
	_styles = new DirtyMap()
	_transforms = new DirtyMap()
	_updating = false

	constructor() {
		super()

		this._attrs.set('id', randomId())
		this._attrs.onUpdate(this.notifier)
		this._styles.onUpdate(this.notifier)
		this._transforms.onUpdate(this.notifier)
	}

	get id() {
		return this._attrs.get('id')
	}

	get element() {
		return this._element
	}

	// Get or sets an element attribute. If value is
	// undefined, then gets the value, else sets the
	// attribute.
	attr(name, value = undefined) {
		if (value === undefined) {
			return this._attrs.get(name)
		}
		this._attrs.put(name, value)
		return this
	}

	// Sets all own properties in the object as element
	// attributes.
	attrs(obj = {}) {
		this._attrs.putProps(obj)
		return this
	}

	// Get or sets an element style. If value is undefined,
	// then gets the style, else sets the style.
	style(name, value = undefined) {
		if (value === undefined) {
			return this._styles.get(name)
		}
		this._styles.put(name, value)
		return this
	}

	// Sets all own properties in the object as element
	// styles.
	styles(obj = {}) {
		this._styles.putProps(obj)
		return this
	}

	// Get or sets an SVG element transform. If value is
	// undefined, then gets the transform, else sets the
	// transform.
	transform(name, value = undefined) {
		if (value === undefined) {
			return this._transforms.get(name)
		}
		this._transforms.put(name, value)
		return this
	}

	// Sets all own properties in the object as SVG element
	// transforms.
	transforms(obj = {}) {
		this._transforms.putProps(obj)
		return this
	}

	// Shortcut for adding itself to a group.
	addTo(group) {
		group.add(this)
		return this
	}

	updated() {
		if (this._updating) {
			// To prevent calls triggered by this function.
			return
		}

		try {
			this._updating = true

			if (this.element) {
				this._updateAttr()
				this._updateStyle()
				this._updateTransform()
			}

			super.updated()
		} finally {
			this._updating = false
		}
	}

	_setElement(element) {
		this._element = element
	}

	_updateAttr() {
		for (const name of this._attrs.listDirty()) {
			const v = this._attrs.val(name)

			if (v === undefined) {
				this.element.removeAttribute(name)
			} else {
				this.element.setAttribute(name, v)
			}
		}

		this._attrs.clean()
	}

	_updateStyle() {
		if (this._styles.isDirty()) {
			const style = this._styles
				.map(([k, v]) => `${k}: ${v};`) //
				.join('') //
			this.element.setAttribute('style', style)
		}

		this._styles.clean()
	}

	_updateTransform() {
		if (this._transforms.isDirty()) {
			const transforms = this._transforms
				.map(this._transformValueToString) //
				.map(this._transformPairToString) //
				.join('') //
			this.element.setAttribute('transform', transforms)
		}

		this._transforms.clean()
	}

	_transformValueToString([k, v]) {
		if (Array.isArray(v)) {
			return [k, v.join(' ')]
		}

		return [k, v]
	}

	_transformPairToString([k, v]) {
		return `${k}(${v})`
	}
}
