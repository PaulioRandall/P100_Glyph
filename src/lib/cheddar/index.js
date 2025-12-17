import SVG from './SVG.js'
import Path from './Path.js'
import PathCommand from './PathCommand.js'

export default {
	SVG,
	Path,
	PathCommand,
	PathMove: PathCommand.move,
	PathLine: PathCommand.line,
	PathQuadCurve: PathCommand.quadCurve,
	PathCubicCurve: PathCommand.cubicCurve,
	PathClose: PathCommand.close,
}
