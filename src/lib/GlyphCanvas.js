import { GridCanvas } from '$ramen'

import { ClickSimplifier, CellHighlighter, Diagram, PathDrawer } from './organs'

export default class GlyphCanvas extends GridCanvas {
	static MODE_IDLE = 'Idle'
	static MODE_DRAWING = 'Drawing'
	static MODE_EDITING = 'Editing'
	static MODES = [
		GlyphCanvas.MODE_IDLE,
		GlyphCanvas.MODE_DRAWING,
		GlyphCanvas.MODE_EDITING,
	]

	_mode = GlyphCanvas.MODE_IDLE

	_clickSimplifier = new ClickSimplifier(this)
	_cellHighlighter = new CellHighlighter(this)
	_diagram = new Diagram(this)
	_pathDrawer = new PathDrawer(this)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, (options = {}))

		this._addOrgan('clickSimplifier', this._clickSimplifier)
		this._addOrgan('cellHighlighter', this._cellHighlighter)
		super.add(this._diagram)
		this._addOrgan('pathDrawer', this._pathDrawer)
	}

	get mode() {
		return this._mode
	}

	changeMode(mode) {
		if (!GlyphCanvas.MODES.includes(mode)) {
			throw new Error(`Unknown mode '${mode}'`)
		}

		this._mode = mode

		this.dispatch('canvas_mode_changed', {
			canvas: this,
			mode,
		})
	}

	idleMode() {
		this.changeMode(GlyphCanvas.MODE_IDLE)
	}

	drawMode() {
		this.changeMode(GlyphCanvas.MODE_DRAWING)
	}

	editMode() {
		this.changeMode(GlyphCanvas.MODE_EDITING)
	}

	// Focus and selection

	get elements() {
		return this._diagram.elements
	}

	get lastFocused() {
		return this._diagram.lastFocused
	}

	get focused() {
		return this._diagram.focused
	}

	get lastSelected() {
		return this._diagram.lastSelected
	}

	get selected() {
		return this._diagram.selected
	}

	addElement(element) {
		this._diagram.addElement(element)
	}

	removeElement(element) {
		this._diagram.removeElement(element)
	}

	focus(element) {
		this._diagram.focus(element)
	}

	unfocus() {
		this._diagram.unfocus()
	}

	unfocusIfElement(element) {
		this._diagram.unfocusIfElement(element)
	}

	select(element) {
		this._diagram.select(element)
	}

	unselect() {
		this._diagram.unselect()
	}

	unselectIfElement(element) {
		this._diagram.unselectIfElement(element)
	}

	// Dead

	_addOrgan(name, organ) {
		super.add(organ)
		this.store.set(name, organ)
	}

	_removeOrgan(name, organ) {
		super.remove(organ)
		this.store.delete(name)
	}
}
