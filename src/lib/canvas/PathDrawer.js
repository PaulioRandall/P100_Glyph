import { EventGroup, ClickTracker } from '$ramen'
import { PathBuilder } from '../elements'

export default class PathDrawer extends EventGroup {
	_builder = null
	_clickTracker = new ClickTracker()

	__group__removed() {
		super.__group__removed()
		this._resetPath()
	}

	__on__grid_cell_hover(e) {
		const builder = this._builder
		const cell = this.canvas.hovered

		if (builder && cell) {
			builder.moveCursorTo(cell)
		}
	}

	__on__left_click() {
		const hoveredCell = this.canvas.hovered
		const builder = this._builder
		const clickCount = this._clickTracker.click()
		const doubleClick = clickCount >= 2

		if (!builder && doubleClick) {
			this._clickTracker.reset()
			this._startPath(hoveredCell)
			return
		}

		if (builder && !doubleClick) {
			this._builder.lineTo(hoveredCell)
			return
		}

		if (builder && doubleClick) {
			this._finishPath()
			return
		}
	}

	__on__right_click() {
		if (this._builder) {
			this._removeLastCommand()
		}
	}

	_startPath(cell) {
		this._builder = new PathBuilder(this.canvas, cell)
		super.add(this._builder)

		this.canvas.drawMode()
		this.canvas.dispatch('path_drawer_started')
	}

	_removeLastCommand() {
		this._builder._removeLastCommand()

		if (this._builder.isEmpty()) {
			this._reset()
		}
	}

	_finishPath() {
		const path = this._builder.build()

		this.canvas.dispatch('path_drawer_finished')
		this.canvas.addElement(path)

		this._reset()
	}

	_reset() {
		super.clear()
		this.canvas.idleMode()

		this._builder = null
		this._clickTracker.reset()

		this.canvas.dispatch('path_drawer_reset')
	}
}
