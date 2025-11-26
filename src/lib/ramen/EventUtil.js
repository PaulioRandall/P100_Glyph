export default Object.freeze({
	x(event) {
		return event.offsetX
	},

	y(event) {
		return event.offsetY
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
