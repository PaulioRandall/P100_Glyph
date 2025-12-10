import EventGroup from './EventGroup.js'
import EventUtil from './EventUtil.js'

export default class CanvasNav extends EventGroup {
	_panning = false

	__on__wheel(e) {
		var dy = (e.wheelDeltaY || -e.deltaY) / 1000
		this.canvas.zui.zoomBy(dy, e.clientX, e.clientY)
	}

	__on__pointerdown(e) {
		if (EventUtil.isMiddleButton(e)) {
			this._panning = true
		}
	}

	__on__pointermove(e) {
		if (this._panning) {
			const [dx, dy] = this._limitPanning(e)
			this.canvas.zui.translateSurface(dx, dy)
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

	_limitPanning(e) {
		const zui = this.canvas.zui
		const scale = zui.scale

		const shadowWidth = this.canvas.shadowWidth * scale
		const shadowHeight = this.canvas.shadowHeight * scale

		const windowX = window.screenX * scale
		const windowY = window.screenY * scale
		const coords = zui.clientToSurface(windowX, windowY)

		let dx = e.movementX
		let dy = e.movementY

		//	console.log(coords)

		// TODO: Why (400 * scale) && (coords.x > 1490) ????
		/*
		if (coords.x < 400 * scale && dx > 0) {
			dx = 0
		} else if (coords.x > 1490 * scale && dx < 0) {
			dx = 0
		}
		*/

		// TODO: Something to do with shadowHeight ????
		/*
		if (coords.y < -640 * scale && dy > 0) {
			dy = 0
		} else if (coords.y > 665 * scale && dy < 0) {
			dy = 0
		}
		*/

		const scene = this.canvas.two.scene
		console.log(coords)

		return [dx, dy]

		/*
		if (offsideX || offsideY) {
			this.canvas.zui.translateSurface(
				offsideX ? -e.movementX : 0,
				offsideY ? -e.movementY : 0,
			)
		}
		*/
	}
}
