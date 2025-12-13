import EventGroup from './EventGroup.js'
import EventUtil from './EventUtil.js'

export default class CanvasNav extends EventGroup {
	_panning = false

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
		const topLeftScreenPos = this._topLeftOfScreenOnCanvas()
		const offsetFromEdge = this._offsetFromEdgeRect(topLeftScreenPos)

		// Allow user to go off the edge of the canvas a
		// little. 60px by default which grows as the user
		// zooms out and shrinks as the user zooms in.
		const buffer = Math.round(60 * (1 / this.canvas.zui.scale))

		let dx = e.movementX
		let dy = e.movementY

		if (offsetFromEdge.left < -buffer && dx > 0) {
			dx = 0
		} else if (offsetFromEdge.right > buffer && dx < 0) {
			dx = 0
		}

		if (offsetFromEdge.top < -buffer && dy > 0) {
			dy = 0
		} else if (offsetFromEdge.bottom > buffer && dy < 0) {
			dy = 0
		}

		return [dx, dy]
	}

	_topLeftOfScreenOnCanvas() {
		const zui = this.zui
		const rect = this.canvas.dom.getBoundingClientRect()
		return zui.clientToSurface(
			rect.x, //
			rect.y, //
			zui.scale
		)
	}

	_offsetFromEdgeRect(center) {
		const scale = this.zui.scale
		const shadowRadius = this.canvas.shadowSize * 0.5
		const scaledShadowRadius = shadowRadius * scale

		return {
			left: Math.round(center.x + scaledShadowRadius),
			right: Math.round(center.x - scaledShadowRadius + window.innerWidth),
			top: Math.round(center.y + scaledShadowRadius),
			bottom: Math.round(center.y - scaledShadowRadius + window.innerHeight),
		}
	}
}
