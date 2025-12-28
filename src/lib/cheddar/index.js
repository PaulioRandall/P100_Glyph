import Updateable from './Updateable.js'
import Elemental from './Elemental.js'
import BBox from './BBox.js'

import SVG from './SVG.js'
import Group from './Group.js'

import Path from './Path.js'
import Command from './Command.js'

import Circle from './Circle.js'

export default {
	Updateable,
	Elemental,

	// BBox
	BBox,
	bbox: BBox.from,

	// SVG
	SVG,
	svg: SVG.from,

	// Group
	Group,
	group: Group.from,

	// Path
	Path,
	path: Path.from,
	rect: Path.rect,

	// Command
	Command,
	PathMove: Command.move,
	PathLine: Command.line,
	PathQuadratic: Command.quadratic,
	Pathcubic: Command.cubic,
	PathClose: Command.close,

	// Shapes
	Circle,
	circle: Circle.from,
}
