import { GridCanvas } from '$ramen'

import { ClickSimplifier, CellHighlighter, Diagram, PathDrawer } from './organs'

export default class GlyphCanvas extends GridCanvas {
	static MODE_DRAW = 'draw'
	static MODE_SELECT = 'select'
	static MODES = [GlyphCanvas.MODE_DRAW, GlyphCanvas.MODE_SELECT]

	_mode = $state(GlyphCanvas.MODE_DRAW)

	_clickSimplifier = new ClickSimplifier(this)
	_cellHighlighter = new CellHighlighter(this)
	_diagram = new Diagram(this)
	_pathDrawer = new PathDrawer(this)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, (options = {}))

		this._addOrgan('clickSimplifier', this._clickSimplifier)
		this._addOrgan('cellHighlighter', this._cellHighlighter)
		this._addOrgan('diagram', this._diagram)
		this._addOrgan('pathDrawer', this._pathDrawer)
	}

	_addOrgan(name, organ) {
		this.add(organ)
		this.store.set(name, organ)
	}

	get mode() {
		return this._mode
	}

	_changeMode(newMode) {
		if (!GlyphCanvas.MODES.includes(newMode)) {
			throw new Error(`Unknown mode '${newMode}'`)
		}

		this._mode = newMode
	}

	enterDrawMode() {
		this._changeMode(GlyphCanvas.MODE_DRAW)

		// TODO
	}

	enterSelectMode() {
		this._changeMode(GlyphCanvas.MODE_SELECT)

		// TODO
	}
}
