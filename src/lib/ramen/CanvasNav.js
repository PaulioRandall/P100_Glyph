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

		// TODO: Probably needs to change depending if
		//       width or height is used as min.
		const rect = this.canvas.dom.getBoundingClientRect()
		const sizeDiff = rect.width - rect.height
		const scale = zui.scale

		const offset = zui.clientToSurface(
			rect.x + rect.width / 2, //
			rect.y + rect.height / 2 //
		)

		let dx = e.movementX
		let dy = e.movementY

		// Why 16-20px offset ?????? Border? Margin? Scrollbar?
		const xBase = offset.x - sizeDiff - 18
		const scaledWidth = scale < 1 ? rect.width * scale : rect.width

		if (xBase + scaledWidth < 0 && dx > 0) {
			dx = 0
		} else if (scaledWidth - xBase < 0 && dx < 0) {
			dx = 0
		}

		const yBase = offset.y - sizeDiff
		const adjustedHeight = rect.height + sizeDiff
		const scaledHeight = scale < 1 ? adjustedHeight * scale : adjustedHeight

		if (yBase + scaledHeight < 0 && dy > 0) {
			dy = 0
		} else if (scaledHeight - yBase < 0 && dy < 0) {
			dy = 0
		}

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
