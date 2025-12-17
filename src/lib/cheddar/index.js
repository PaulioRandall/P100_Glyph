import SVG from './SVG.js'
import Path from './Path.js'
import PathCommand from './PathCommand.js'
import Bounds from './Bounds.js'
import Updateable from './Updateable.js'

export default {
	Updateable,
	SVG,
	Bounds,
	Path,
	PathCommand,
	PathMove: PathCommand.move,
	PathLine: PathCommand.line,
	PathQuadCurve: PathCommand.quadCurve,
	PathCubicCurve: PathCommand.cubicCurve,
	PathClose: PathCommand.close,
}
