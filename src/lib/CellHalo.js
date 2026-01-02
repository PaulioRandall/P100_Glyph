import Cheddar from '$cheddar'

export default class CellHalo extends Cheddar.Circle {
	_disabled = false

	constructor() {
		super()

		this.attr('fill', 'none')
	}

	__onsvg__panstart(e) {
		this._disabled = true
	}

	__onsvg__panend(e) {
		this._disabled = false
	}

	__onsvg__gridcellhover(e) {
		if (this._disabled) {
			return
		}

		const cell = e.detail.cell
		this._cell = cell

		if (cell === null) {
			this.attr('visibility', 'hidden')
			return
		}

		this.doUpdate(() => {
			this.attr('visibility', 'visible')
			this.setCenterX(cell.centerX)
			this.setCenterY(cell.centerY)
			this.setRadius(cell.cellbox.width / 2)
		})
	}
}
