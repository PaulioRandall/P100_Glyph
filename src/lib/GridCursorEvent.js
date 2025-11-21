export default class GridCursorEvent {
	static get LEFT_MOUSE_BUTTON() {
		return 0
	}

	static get MIDDLE_MOUSE_BUTTON() {
		return 1
	}

	static get RIGHT_MOUSE_BUTTON() {
		return 2
	}

	_grid = null
	_x = 0
	_y = 0
	_button = 0
	_cell = null

	constructor(grid) {
		this._grid = grid
	}

	get grid() {
		return this._grid
	}

	get x() {
		return this._x
	}

	get y() {
		return this._y
	}

	get button() {
		return this._button
	}

	get cell() {
		return this._cell
	}

	updateFromEvent(event) {
		this._x = event.offsetX
		this._y = event.offsetY
		this._button = event.button
		this._cell = this.grid.cellAt(this.x, this.y)
	}

	copy() {
		const copy = new GridCursorEvent(this.grid)

		copy._x = this.x
		copy._y = this.y
		copy._button = this.button
		copy._cell = this.cell

		return copy
	}

	isButton(button) {
		return this._button === button
	}

	isLeftButton() {
		return this._button === GridCursorEvent.LEFT_MOUSE_BUTTON
	}

	isMiddleButton() {
		return this._button === GridCursorEvent.MIDDLE_MOUSE_BUTTON
	}

	isRightButton() {
		return this._button === GridCursorEvent.RIGHT_MOUSE_BUTTON
	}
}
