import Cheddar from '$cheddar'
import EventUtil from './EventUtil.js'

export default class PathDrawer extends Cheddar.Group {
	_path = null
	_hovered = null
	_guideCmd = null

	__onsvg__mousedown(e) {
		if (EventUtil.isLeftButton(e)) {
			this._leftClick(e)
		} else if (EventUtil.isRightButton(e)) {
			this._rightClick(e)
		}
	}

	__onsvg__gridcellhover(e) {
		const hov = e.detail.cell
		this._hovered = hov

		if (this._path) {
			this._guideCmd.setXY(hov.x, hov.y)
		}
	}

	_leftClick(e) {
		if (!this._path) {
			this._beginAtHovered()
			return
		}

		this._lineToHovered()
	}

	_beginAtHovered() {
		const hov = this._hovered

		this._path = Cheddar.path(hov.x, hov.y)
		this._path.lineTo(hov.x, hov.y)
		this._guideCmd = this._path.lastCommand

		this.add(this._path)
	}

	_lineToHovered() {
		const hov = this._hovered
		const p = this._path

		p.doUpdate(() => {
			p.removeCommand(this._guideCmd)

			if (p.lastCommand.x !== hov.x || p.lastCommand.y !== hov.y) {
				p.lineTo(hov.x, hov.y)
			}

			p.addCommand(this._guideCmd)
		})
	}

	_rightClick() {
		const hov = this._hovered
		const p = this._path

		if (!p) {
			return
		}

		p.removeCommand(this._guideCmd)

		if (p.firstCommand.hasXY(hov.x, hov.y)) {
			p.close()
		}

		this.svg.dispatch('newpath', { path: this._path })
		this._path = null

		this.svg.dispatch('switchmode', {
			mode: 'MODE_IDLE',
		})
	}
}
