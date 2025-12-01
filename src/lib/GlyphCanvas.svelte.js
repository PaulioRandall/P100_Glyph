import { GridCanvas } from '$ramen'

import { ClickSimplifier, CellHighlighter, Diagram, PathDrawer } from './organs'

export default class GlyphCanvas extends GridCanvas {
	_clickSimplifier = new ClickSimplifier(this)
	_cellHighlighter = new CellHighlighter(this)
	_diagram = new Diagram(this)
	_pathDrawer = new PathDrawer(this)

	_pathDrawing = $state(false)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, (options = {}))

		this._addOrgan('clickSimplifier', this._clickSimplifier)
		this._addOrgan('cellHighlighter', this._cellHighlighter)
		this._addOrgan('diagram', this._diagram)

		this.pathDrawing = true
	}

	_addOrgan(name, organ) {
		this.add(organ)
		this.store.set(name, organ)
	}

	_removeOrgan(name, organ) {
		this.remove(organ)
		this.store.delete(name)
	}

	get pathDrawing() {
		return this._pathDrawing
	}

	set pathDrawing(newState = true) {
		this._pathDrawing = newState

		if (this._pathDrawing) {
			this._addOrgan('pathDrawer', this._pathDrawer)
		} else {
			this._removeOrgan('pathDrawer', this._pathDrawer)
		}
	}
}
