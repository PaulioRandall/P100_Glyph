export default Object.freeze({
	x(event) {
		return event.offsetX
	},

	y(event) {
		return event.offsetY
	},

	button(event) {
		return event.button
	},

	isButton(event, button) {
		return event.button === button
	},

	isLeftButton(event) {
		return event.button === 0
	},

	isMiddleButton(event) {
		return event.button === 1
	},

	isRightButton(event) {
		return event.button === 2
	},
})
