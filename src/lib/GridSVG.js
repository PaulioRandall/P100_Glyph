import Cheddar from '$cheddar'
import Grid from './Grid.js'

// TODO: Pan and Zoom, snap to nearest grid point (+margin)
export default class GridSVG extends Cheddar.SVG {
	_grid = new Grid()

	constructor() {
		super()

		this.hideGrid()

		// TODO: Use 100% of parent instead.
		this.styles({
			width: 'min(100vw, 100vh)',
			height: 'min(100vw, 100vh)',
		})

		this.add(this._grid)
	}

	get grid() {
		return this._grid
	}

	showGrid() {
		this._grid.attr('visibility', 'visible')
		return this
	}

	hideGrid() {
		this._grid.attr('visibility', 'hidden')
		return this
	}

	updated() {
		if (!this._grid) {
			return
		}

		this.doMuted(() => {
			this.viewbox.copy(this._grid.gridbox)
		})

		super.updated()
	}
}
