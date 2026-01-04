import Cheddar from '$cheddar'
import Embed from '$embed'
import GridCell from './GridCell.js'

export default class Grid extends Cheddar.Group {
	_size = 9
	_buffer = 7
	_spacing = 25
	_margin = 0.5
	_pointSize = 3
	_bufferPointSize = 2
	_gridbox = Cheddar.bbox()
	_hovered = null

	constructor() {
		super()
		this._updateCells()
	}

	get gridbox() {
		return this._gridbox
	}

	get hovered() {
		return this._hovered
	}

	size(v = undefined) {
		return this._getOrSet('_size', v)
	}

	buffer(v = undefined) {
		return this._getOrSet('_buffer', v)
	}

	spacing(v = undefined) {
		return this._getOrSet('_spacing', v)
	}

	margin(v = undefined) {
		return this._getOrSet('_margin', v)
	}

	pointSize(v = undefined) {
		return this._getOrSet('_pointSize', v)
	}

	bufferPointSize(v = undefined) {
		return this._getOrSet('_bufferPointSize', v)
	}

	_getOrSet(name, value = undefined) {
		if (value === undefined) {
			return this[name]
		}

		this[name] = value
		this._updateCells()
		return this
	}

	_updateCells() {
		this.doUpdate(() => {
			this.clear()
			this._generateCells()
			this._updateGridbox()
		})
	}

	_generateCells() {
		const min = -this._buffer
		const max = this._size + this._buffer

		for (let col = min; col < max; col++) {
			for (let row = min; row < max; row++) {
				const x = col * this._spacing
				const y = row * this._spacing
				const isBP = isBufferPoint(col, row, this._size)
				const pointSize = isBP ? this._bufferPointSize : this._pointSize

				const cell = new GridCell(x, y, pointSize, this._spacing, isBP)
				this.add(cell)
			}
		}
	}

	_updateGridbox() {
		const innerLen = this._spacing * (this._size - 1)
		const outerLen = this._spacing * this._buffer
		const marginLen = this._spacing * this._margin

		this._gridbox.setEdges(
			-outerLen - marginLen, //
			-outerLen - marginLen, //
			innerLen + outerLen + marginLen, //
			innerLen + outerLen + marginLen //
		)
	}

	__onsvg__mousemove(e) {
		const coords = this._svg.mapClientToViewbox(e.clientX, e.clientY)

		for (const child of this.children) {
			if (child.cellbox.contains(...coords)) {
				if (child === this._hovered) {
					return
				}

				this._hovered = child
				this._svg.dispatch('gridcellhover', { cell: child })
				return
			}
		}

		this._hovered = null
		this._svg.dispatch('gridcellhover', { cell: null })
	}
}

function isBufferPoint(col, row, size) {
	if (col < 0 || col >= size) {
		return true
	}

	if (row < 0 || row >= size) {
		return true
	}

	return false
}
