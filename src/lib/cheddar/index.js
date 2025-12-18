import SVG from './SVG.js'
import Path from './Path.js'
import SubPath from './SubPath.js'
import Command from './Command.js'
import Bounds from './Bounds.js'
import Updateable from './Updateable.js'

export default {
	Updateable,
	SVG,
	Bounds,
	Path,
	SubPath,
	Command,
	PathMove: Command.move,
	PathLine: Command.line,
	PathQuadratic: Command.quadratic,
	Pathcubic: Command.cubic,
	PathClose: Command.close,
}
