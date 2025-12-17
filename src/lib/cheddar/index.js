import SVG from './SVG.js'
import Path from './Path.js'
import Command from './Command.js'
import Bounds from './Bounds.js'
import Updateable from './Updateable.js'

export default {
	Updateable,
	SVG,
	Bounds,
	Path,
	Command,
	PathMove: Command.move,
	PathLine: Command.line,
	PathQuadCurve: Command.quadCurve,
	PathCubicCurve: Command.cubicCurve,
	PathClose: Command.close,
}
