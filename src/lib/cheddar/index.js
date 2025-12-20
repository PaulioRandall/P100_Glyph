import SVG from './SVG.js'
import Group from './Group.js'
import Path from './Path.js'
import SubPath from './SubPath.js'
import Command from './Command.js'
import Bounds from './Bounds.js'
import Updateable from './Updateable.js'
import Elemental from './Elemental.js'

export default {
	Updateable,
	SVG,
	Group,
	Path,
	SubPath,
	Command,
	Bounds,
	PathMove: Command.move,
	PathLine: Command.line,
	PathQuadratic: Command.quadratic,
	Pathcubic: Command.cubic,
	PathClose: Command.close,
}
