import Cheddar from '$cheddar'
import Moonfire from '$moonfire'
import Grid from './Grid.js'
import EventUtil from './EventUtil.js'

export default class GridSVG extends Cheddar.SVG {
	_grid = new Grid()

	constructor() {
		super()

		this.hideGrid()

		this.styles({
			width: '100cqmin',
			height: '100cqmin',
			background: 'white',
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

	__on__wheel(e) {
		const factor = e.deltaY < 0 ? 0.1 : -0.1
		const oldScale = this.group.transform('scale') || 1
		const newScale = oldScale + factor

		if (newScale >= 0.5 && newScale < 2) {
			this.group.transform('scale', newScale)
		}
	}

	__on__mousedown(e) {
		if (EventUtil.isLeftButton(e)) {
			this.callOn(this.__off__mousemove)
			this.style('cursor', 'move')
			this.dispatch('panstart')
		}
	}

	__off__mousemove(e) {
		const curr = this.group.transform('translate') || [0, 0]
		const scale = this.group.transform('scale') || 1

		const move = [
			curr[0] + e.movementX, //
			curr[1] + e.movementY, //
		]

		// TODO: Good but could be better by getting the
		//       elements pos on the screen and...
		//       - if the SVG fits on the screen then limit
		//         so the grid is always visible on screen.
		//       - if the SVG is wider or taller than the
		//         screen then only allow the panning up to the
		//         SVG edges.
		//       OR use mapClientToViewbox somehow
		const widthLimit = (this._grid.gridbox.width / 2) * scale
		const heightLimit = (this._grid.gridbox.height / 2) * scale

		if (move[0] < -widthLimit) {
			move[0] = -widthLimit
		} else if (move[0] > widthLimit) {
			move[0] = widthLimit
		}

		if (move[1] < -heightLimit) {
			move[1] = -heightLimit
		} else if (move[1] > heightLimit) {
			move[1] = heightLimit
		}

		this.group.transform('translate', move)
	}

	__on__mouseup(e) {
		if (EventUtil.isLeftButton(e)) {
			this.callOff(this.__off__mousemove)
			this.style('cursor', 'auto')
			this.dispatch('panend')
		}
	}

	__on__mouseleave(e) {
		this.callOff(this.__off__mousemove)
		this.style('cursor', 'auto')
		this.dispatch('panend')
	}
}
