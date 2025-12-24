import Updateable from './Updateable.js'
import Elemental from './Elemental.js'
import BBox from './BBox.js'

import SVG from './SVG.js'
import SVGNav from './SVGNav.js'
import Group from './Group.js'

import Path from './Path.js'
import SubPath from './SubPath.js'
import Command from './Command.js'

import Circle from './Circle.js'

export default {
	Updateable,
	Elemental,
	BBox,

	// Groups
	SVG,
	Group,
	SVGNav,

	// Paths
	Path,
	SubPath,
	Command,
	PathMove: Command.move,
	PathLine: Command.line,
	PathQuadratic: Command.quadratic,
	Pathcubic: Command.cubic,
	PathClose: Command.close,

	// Shapes
	Circle,
}
