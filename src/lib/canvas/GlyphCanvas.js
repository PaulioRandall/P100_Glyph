import { GridCanvas, CanvasNav } from '$ramen-grid'
import Diagram from './Diagram.js'

import ClickSimplifier from './misc/ClickSimplifier.js'
import GridCell from './misc/GridCell.js'
import CanvasMode from './misc/CanvasMode.js'
import PathDrawer from './path/PathDrawer.js'
import SelectedElementsEditor from './selected/SelectedElementsEditor.js'

// IDEA: Remove areas. Allow user to specify the area for
//       export.
export default class GlyphCanvas extends GridCanvas {
	_nav = new CanvasNav(this)
	_diagram = new Diagram(this)

	_clickSimplifier = new ClickSimplifier(this)
	_gridCell = new GridCell(this)
	_canvasMode = new CanvasMode(this)
	_pathDrawer = new PathDrawer(this)
	_selectedElementsEditor = new SelectedElementsEditor(this)

	constructor(container, xLength, yLength, options = {}) {
		super(container, xLength, yLength, options)

		this._nav.setBounds({
			left: this.gridWidth / 2 - this.gridWidth,
			right: this.gridWidth / 2 + this.gridWidth,
			top: this.gridHeight / 2 - this.gridHeight,
			bottom: this.gridHeight / 2 + this.gridHeight,
		})
		this.add(this._nav)

		this.add(this._diagram)
		this.add(this._clickSimplifier)
		this.add(this._gridCell)
		this.add(this._canvasMode)
		this.add(this._pathDrawer)
		this.add(this._selectedElementsEditor)

		setTimeout(
			function () {
				// Zoom out slightly so the main canvas area is
				// fully visible.
				this._nav.zoomTo(0.8)

				// TODO: This needs to be moved to GridCanvas.
				//
				// Move so the center of the canvas is close to the
				// the middle of the screen, but not under the
				// overlay.
				this._nav.panBy(this.width / 2.5, this.height / 1.8)

				this.dom.focus()
			}.bind(this),
			0 // Do straight after DOM update.
		)
	}

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
}
