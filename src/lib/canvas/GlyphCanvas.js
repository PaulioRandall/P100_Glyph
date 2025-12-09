import { GridCanvas } from '$ramen'

import ClickSimplifier from './misc/ClickSimplifier.js'
import GridCell from './misc/GridCell.js'
import CanvasMode from './misc/CanvasMode.js'

import Diagram from './Diagram.js'

import PathDrawer from './path/PathDrawer.js'
import SelectedElementsEditor from './selected/SelectedElementsEditor.js'

export default class GlyphCanvas extends GridCanvas {
	_clickSimplifier = new ClickSimplifier(this)
	_gridCell = new GridCell(this)
	_canvasMode = new CanvasMode(this)
	_diagram = new Diagram(this)

	_pathDrawer = new PathDrawer(this)
	_selectedElementsEditor = new SelectedElementsEditor(this)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, options)

		super.add(this._clickSimplifier)
		super.add(this._gridCell)
		super.add(this._canvasMode)
		super.add(this._diagram)
		super.add(this._pathDrawer)
		super.add(this._selectedElementsEditor)
	}

	// ClickSimplifier
	// No exposed functions.

	// GridCellHighlighter
	// No exposed functions.

	// CanvasMode

	get mode() {
		return this._canvasMode.current
	}

	// Diagram

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

	// PathDrawer
	// No exposed functions.

	// ActiveElements
	// No exposed functions.
}
