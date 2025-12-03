import { GridCanvas } from '$ramen'

import ClickSimplifier from './ClickSimplifier.js'
import GridCellHighlighter from './GridCellHighlighter.js'
import CanvasMode from './CanvasMode.js'
import Diagram from './Diagram.js'
import PathDrawer from './PathDrawer.js'
import SelectedElement from './SelectedElement.js'

export default class GlyphCanvas extends GridCanvas {
	_clickSimplifier = new ClickSimplifier(this)
	_gridCellHighlighter = new GridCellHighlighter(this)
	_canvasMode = new CanvasMode(this)
	_diagram = new Diagram(this)
	_pathDrawer = new PathDrawer(this)
	_selectedElement = new SelectedElement(this)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, options)

		super.add(this._clickSimplifier)
		super.add(this._gridCellHighlighter)
		super.add(this._canvasMode)
		super.add(this._diagram)
		super.add(this._pathDrawer)
		super.add(this._selectedElement)
	}

	// ClickSimplifier
	// No exposed functions

	// GridCellHighlighter
	// No exposed functions

	// CanvasMode

	get mode() {
		return this._canvasMode.current
	}

	idleMode() {
		this._canvasMode.switchTo('Idle')
	}

	drawMode() {
		this._canvasMode.switchTo('Drawing')
	}

	editMode() {
		this._canvasMode.switchTo('Editing')
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
	// No exposed functions
}
