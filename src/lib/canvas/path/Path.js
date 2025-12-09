import { Two, CanvasGroup } from '$ramen'

export default class Path extends CanvasGroup {
	static makeVertex(cell) {
		return makeVertex(cell)
	}

	_geometry = []
	_styles = {}
	_shape = null

	get geometry() {
		return this._geometry
	}

	get nodeCount() {
		return this._geometry.length
	}

	get styles() {
		return this._styles
	}

	get shape() {
		return this._shape
	}

	get isClosed() {
		return this.shape.closed
	}

	get isVisible() {
		return this.shape.visible
	}

	constructor(canvas, geometry = [], styles = {}) {
		super(canvas)

		this._geometry = geometry
		this._styles = styles

		this.rebuildShape()
	}

	pushNode(cell) {
		this._geometry.push(cell)
		this.rebuildShape()
	}

	popNode() {
		this._geometry.pop()
		this.rebuildShape()
	}

	hide() {
		this.visible = false
	}

	show() {
		this.visible = true
	}

	applyStyles(styles) {
		for (const key in styles) {
			if (typeof styles[key] === 'undefined') {
				delete this._styles[key]
			} else {
				this._styles[key] = styles[key]
			}
		}

		this.rebuildShape()
	}

	rebuildShape() {
		const shape = makeShape(this._geometry)

		for (const key in this._styles) {
			shape[key] = this._styles[key]
		}

		// TODO: This should be applied externally as a style
		//       by some other organ.
		if (shape.closed) {
			shape.fill = shape.stroke
		}

		this.clear()

		this._shape = shape
		this.add(shape)
	}

	updateStyle() {
		if (this.canvas.selected === this) {
			return
		} else if (this.canvas.focused === this) {
			this.updateColor('orange')
		} else {
			this.updateColor('indianred')
		}
	}

	updateColor(color) {
		const shape = this._shape

		shape.stroke = color
		shape.fill = shape.closed ? color : 'none'
	}
}

function makeShape(geometry) {
	const path = new Two.Path(
		geometry.map(makeVertex),
		false, // Not closed
		false, // Not curved
		false // Two.js handles plotting
	)

	path.fill = 'none'
	path.stroke = 'indianred'
	path.linewidth = 16
	path.cap = 'round'
	path.join = 'round'

	return path
}

function makeVertex({ x, y }) {
	// NOTE: Left and right control point handles of a
	//       Two.Anchor are relative to its position
	//       (i.e. x and y).
	//
	//       https://two.js.org/docs/anchor/

	return new Two.Anchor(x, y, 0, 0, 0, 0, 'line')
}
