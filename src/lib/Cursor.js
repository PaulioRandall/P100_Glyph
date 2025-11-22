export default class Cursor {
	static fromEvent(e) {
		return new Cursor(e.offsetX, e.offsetY, e.button)
	}

	static get LEFT_BUTTON() {
		return 0
	}

	static get MIDDLE_BUTTON() {
		return 1
	}

	static get RIGHT_BUTTON() {
		return 2
	}

	_x = 0
	_y = 0
	_button = 0

	constructor(x, y, button) {
		this._x = x
		this._y = y
		this._button = button
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

	clone() {
		return new Cursor(this._x, this._y, this._button)
	}

	isButton(button) {
		return this._button === button
	}

	isLeftButton() {
		return this._button === Cursor.LEFT_BUTTON
	}

	isMiddleButton() {
		return this._button === Cursor.MIDDLE_BUTTON
	}

	isRightButton() {
		return this._button === Cursor.RIGHT_BUTTON
	}
}
