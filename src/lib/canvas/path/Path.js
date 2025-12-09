import BasePath from './BasePath.js'

export default class Path extends BasePath {
	constructor(canvas, commands, closed) {
		super(canvas, commands, closed)
	}

	updateShape(edits) {
		super.updateShape(edits)
		this.updateStyle()
	}

	updateStyle() {
		if (this.canvas.selected === this) {
			this.updateColor('blue')
		} else if (this.canvas.focused === this) {
			this.updateColor('orange')
		} else {
			this.updateColor('indianred')
		}
	}
}
