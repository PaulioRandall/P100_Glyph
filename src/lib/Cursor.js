const LEFT_MOUSE_BUTTON = 0
const MIDDLE_MOUSE_BUTTON = 1
const RIGHT_MOUSE_BUTTON = 2

export default class Cursor {
	x = 0
	y = 0
	button = 0
	gridCell = null

	static fromEvent(e, cells) {
		const c = new Cursor()

		c.x = e.offsetX
		c.y = e.offsetY
		c.button = e.button
		c.gridCell = identifyGridCell(c.x, c.y, cells)

		return c
	}

	isButton(button) {
		return this.button === button
	}

	isLeftButton() {
		return this.button === LEFT_MOUSE_BUTTON
	}

	isMiddleButton() {
		return this.button === MIDDLE_MOUSE_BUTTON
	}

	isRightButton() {
		return this.button === RIGHT_MOUSE_BUTTON
	}
}

function identifyGridCell(x, y, cells) {
	for (const c of cells) {
		if (c.contains(x, y)) {
			return c
		}
	}

	return null
}
