import ArrayUtil from '$arrayutil'
import Cheddar from '$cheddar'
import EventUtil from './EventUtil.js'

export default class PathDrawer extends Cheddar.Group {
	// The point currently being hovered.
	_hovPoint = null

	// The path being edited.
	_path = null

	// The command currently being edited. If null, then no
	// edits are actively taking place.
	_cmdMove = null
	_cmd = null

	constructor(path) {
		super()
		this._path = path
	}

	// Keeping a track of the point currently being hovered
	// over.
	__onsvg__gridcellhover(e) {
		const cell = e.detail.cell

		if (!cell) {
			this._hovPoint = null
			return
		}

		this._hovPoint = [cell.x, cell.y]

		if (this._cmd) {
			// If a command is actively being edited, set its
			// position to be the currently hovered point.
			this._cmd.setXY(...this._hovPoint)
		}
	}

	__onsvg__mousedown(e) {
		if (EventUtil.isLeftButton(e)) {
			this._startDrawingLine(e)
		}
	}

	__onsvg__mouseup(e) {
		if (EventUtil.isLeftButton(e)) {
			this._endDrawingLine(e)
		}
	}

	_startDrawingLine(e) {
		const xy = this._hovPoint
		const p = this._path

		if (!this._isLastPathPointBeingHovered()) {
			p.moveTo(...xy)
			this._cmdMove = p.lastPointCommand
		}

		p.lineTo(...xy)
		this._cmd = p.lastPointCommand

		this.svg.dispatch('drawingpathlinestart', {
			path: p, //
		})
	}

	_isLastPathPointBeingHovered() {
		const lastPointCmd = this._path.lastPointCommand

		if (!lastPointCmd || !this._hovPoint) {
			return false
		}

		return lastPointCmd.hasXY(...this._hovPoint)
	}

	_endDrawingLine() {
		const p = this._path

		if (this._isRedundantLine()) {
			this._resetDrawingline()
			return
		}

		if (p.firstCommand.hasXY(...this._hovPoint)) {
			p.close()
		}

		this._cmdMove = null
		this._cmd = null

		this.svg.dispatch('drawingpathlineend', {
			path: this._path, //
		})
	}

	_isRedundantLine() {
		const cmds = this._path.pointCommands
		const cmdMove = this._cmdMove
		const cmd = this._cmd

		if (cmdMove && cmdMove.hasXY(cmd.x, cmd.y)) {
			return true
		}

		const refCmd = this._cmdMove || this._cmd
		const priorPoint = ArrayUtil.itemBefore(cmds, refCmd)

		if (!priorPoint) {
			return false
		}

		return priorPoint.hasXY(cmd.x, cmd.y)
	}

	_resetDrawingline() {
		this._path.removeCommand(this._cmd)
		this._path.removeCommand(this._cmdMove)

		this._cmdMove = null
		this._cmd = null

		this.svg.dispatch('drawingpathlinereset', {
			path: this._path, //
		})
	}
}
