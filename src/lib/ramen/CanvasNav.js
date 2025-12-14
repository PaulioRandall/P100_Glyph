import EventGroup from './EventGroup.js'
import EventUtil from './EventUtil.js'

export default class CanvasNav extends EventGroup {
	_bounds = {
		left: Infinity,
		top: Infinity,
		right: Infinity,
		bottom: Infinity,
	}
	_panning = false

	setBounds(bounds = {}) {
		const setBound = (name) => {
			if (typeof bounds[name] === 'number') {
				this._bounds[name] = bounds[name]
			}
		}

		setBound('left')
		setBound('right')
		setBound('top')
		setBound('bottom')
	}

	zoomBy(factor, x = 0, y = 0) {
		this.zui.zoomBy(factor, (x = 0), (y = 0))
	}

	zoomTo(factor, x = 0, y = 0) {
		this.zui.zoomSet(factor, (x = 0), (y = 0))
	}

	panBy(dx, dy) {
		this.zui.translateSurface(dx, dy)
	}

	// TODO: panTo()

	reset() {
		this.zui.reset()
	}

	__on__wheel(e) {
		// Bigger number gives more precise zooming, but at the
		// expense of needing to scroll more to zoom in and
		// out.
		const precision = 800
		const dz = e.wheelDeltaY / precision
		this.zui.zoomBy(dz, e.clientX, e.clientY)
	}

	__on__pointerdown(e) {
		if (EventUtil.isMiddleButton(e)) {
			this._panning = true
		}
	}

	__on__pointermove(e) {
		if (this._panning) {
			const [dx, dy] = this._calcPanAmount(e)
			this.zui.translateSurface(dx, dy)
		}
	}

	__on__pointerup(e) {
		if (EventUtil.isMiddleButton(e)) {
			this._panning = false
		}
	}

	__on__pointerleave(e) {
		this._panning = false
	}

	_calcPanAmount(e) {
		// TODO: Finally figured this out.
		//
		//       The grid width is needed but is not part of
		//       the lib.
		//
		//       In this class the boundary should be relative
		//       to { x: 0, y: 0 } and parameters passed to
		//       specify min and max for both x and y.
		//
		//       Try:
		//       const pos = zui.position.x + dx
		//       clamp(min, pos, max)

		const topLeftScreenPos = this._topLeftOfScreenOnCanvas()
		const bottomRightScreenPos = this._bottomRightOfScreenOnCanvas()

		// Allow user to go off the edge of the canvas a
		// little. 60px by default which grows as the user
		// zooms out and shrinks as the user zooms in.
		const buffer = Math.round(60 * (1 / this.canvas.zui.scale))

		let dx = e.movementX
		let dy = e.movementY

		if (topLeftScreenPos.x > 0 && dx < 0) {
			dx = 0
		} else if (bottomRightScreenPos.x < 0 && dx > 0) {
			dx = 0
		}

		if (topLeftScreenPos.y > 0 && dy < 0) {
			dy = 0
		} else if (bottomRightScreenPos.y < 0 && dy > 0) {
			dy = 0
		}

		return [dx, dy]
	}

	_topLeftOfScreenOnCanvas() {
		const zui = this.zui
		const rect = this.canvas.dom.getBoundingClientRect()
		return zui.clientToSurface(
			rect.left, //
			rect.top //
		)
	}

	_bottomRightOfScreenOnCanvas() {
		const zui = this.zui
		const rect = this.canvas.dom.getBoundingClientRect()
		return zui.clientToSurface(
			rect.right, //
			rect.bottom //
		)
	}
}
