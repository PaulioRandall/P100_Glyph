import List from './List.js'

// An SVG path command. It's immutable from the user dev's
// perspective. They should replace existing commands
// in the path if they want to make a change.
//
// Commands are always absolute, i.e. uppercase type.
//
// Arcs and curve shortcuts are not supported, this
// includes 'A', 'S', and 'T' command types.
//
// TODO: Should we have separate classes to represent each
//       type? How would that increase and decrease
//       usability?
export default class PathCommand {
	static move(x, y) {
		return new PathCommand('M', x, y)
	}

	static line(x, y) {
		return new PathCommand('L', x, y)
	}

	static quadCurve(cp1X, cp1Y, x, y) {
		return new PathCommand('Q', cp1X, cp1Y, x, y)
	}

	static cubicCurve(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		return new PathCommand('C', cp1X, cp1Y, cp2X, cp2Y, x, y)
	}

	static close() {
		return new PathCommand('Z')
	}

	_type = ''
	_parameters = new List()
	_string = ''

	_x = null
	_y = null

	_cp1X = null
	_cp1Y = null

	_cp2X = null
	_cp2Y = null

	// TODO: Validate input.
	constructor(type, ...parameters) {
		this._type = type
		this._parameters = parameters
		this._string = [type, ...parameters].join(' ')

		if (type !== 'Z') {
			this._x = List.beforeLast(parameters)
			this._y = List.last(parameters)
		}

		if (type === 'Q') {
			this._cp1X = parameters[0]
			this._cp1Y = parameters[1]
			this._cp2X = parameters[0]
			this._cp2Y = parameters[1]
		}

		if (type === 'C') {
			this._cp1X = parameters[0]
			this._cp1Y = parameters[1]
			this._cp2X = parameters[2]
			this._cp2Y = parameters[3]
		}
	}

	get type() {
		return this._type
	}

	get parameters() {
		return this._parameters
	}

	get x() {
		return this._x
	}

	get y() {
		return this._y
	}

	get cp1X() {
		return this._cp1X
	}

	get cp1Y() {
		return this._cp1Y
	}

	get cp2X() {
		return this._cp2X
	}

	get cp2Y() {
		return this._cp2Y
	}

	toString() {
		return this._string
	}
}
