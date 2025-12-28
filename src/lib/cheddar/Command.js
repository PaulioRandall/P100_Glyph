import Updateable from './Updateable.js'
import CommandIndices from './CommandIndices.js'

// Represents an SVG path command.
//
// Only M, L, Q, C, and Z commands are supported.
export default class Command extends Updateable {
	// Returns a new move command to {x,y}.
	static move(x, y) {
		return new Command('M', x, y)
	}

	// Returns a new line command to {x,y}.
	static line(x, y) {
		return new Command('L', x, y)
	}

	// Returns a new quadratic command to {x,y} using
	// {cp1X,cp1Y} as the control point.
	static quadratic(cp1X, cp1Y, x, y) {
		return new Command('Q', cp1X, cp1Y, x, y)
	}

	// Returns a new cubic command to {x,y} using
	// {cp1X,cp1Y} as the first control point and {cp2X,cp2Y}
	// as the second.
	static cubic(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		return new Command('C', cp1X, cp1Y, cp2X, cp2Y, x, y)
	}

	// Returns a new close command.
	static close() {
		return new Command('Z')
	}

	_params = []
	_type = null
	_x = null
	_y = null
	_cp1X = null
	_cp1Y = null
	_cp2X = null
	_cp2Y = null

	// Arguments:
	// [...]: The parameters in the order rendered by the
	//        path. E.g. ["M", 10, 20] for the move command
	//        `M 10 20`.
	constructor(...params) {
		super()

		this._setFields(...params)
		this.updated()
	}

	get params() {
		return this._params
	}

	get type() {
		return this._type
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

	// Sets the X value.
	setX(x) {
		if (this._x !== null) {
			this._x = x
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the Y value.
	setY(y) {
		if (this._y !== null) {
			this._y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the X and Y value. Triggers a single update
	// notification.
	setXY(x, y) {
		if (this._x !== null) {
			this._x = x
			this._y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the X value of the first control point.
	setCP1X(x) {
		if (this._cp1X !== null) {
			this._cp1X = x
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the Y value of the first control point.
	setCP1Y(y) {
		if (this._cp1Y !== null) {
			this._cp1Y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the X and Y for the first control. Triggers a
	// single update notification.
	setCP1(x, y) {
		if (this._cp1X !== null) {
			this._cp1X = x
			this._cp1Y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the X value of the first control point.
	setCP2X(x) {
		if (this._cp2X !== null) {
			this._cp2X = x
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the Y value of the first control point. Throws an
	// error if the command is not a cubic curve.
	setCP2Y(y) {
		if (this._cp2Y !== null) {
			this._cp2Y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Sets the X and Y for the second control. Triggers a
	// single update notification.
	setCP2(x, y) {
		if (this._cp2X !== null) {
			this._cp2X = x
			this._cp2Y = y
			this.updateParams()
			this.updated()
		}

		return this
	}

	// Moves the command destination X point by dx, which may
	// be negative.
	moveX(dx) {
		this._moveX(dx)

		this.updateParams()
		this.updated()

		return this
	}

	_moveX(dx) {
		if (this._x !== null) {
			this._x += dx
		}

		if (this._cp1X !== null) {
			this._cp1X += dx
		}

		if (this._cp2X !== null) {
			this._cp2X += dx
		}
	}

	// Moves the command destination Y point by dx, which may
	// be negative.
	moveY(dy) {
		this._moveY(dy)

		this.updateParams()
		this.updated()

		return this
	}

	_moveY(dy) {
		if (this._y !== null) {
			this._y += dy
		}

		if (this._cp1Y !== null) {
			this._cp1Y += dy
		}

		if (this._cp2Y !== null) {
			this._cp2Y += dy
		}
	}

	// Moves the command on the X and Y plane by dx and dy,
	// each may be negative.
	move(dx, dy) {
		this._moveX(dx)
		this._moveY(dy)

		this.updateParams()
		this.updated()

		return this
	}

	// Returns true if a call to straighten will modify the
	// command, i.e. returns false if a move 'M', line 'L' or
	// close 'Z' command.
	canStraighten() {
		return (
			this._type !== 'M' && //
			this._type !== 'L' && //
			this._type !== 'Z'
		) //
	}

	// Converts the command to a line command if not already
	// a line command. Will also do nothing if a close
	// command because they create straight lines too and we
	// don't want to open a closed path without the dev
	// user's explicit instruction.
	//
	// If canStraighten is false then no changes will be
	// made.
	straighten() {
		if (!this.canStraighten()) {
			return this
		}

		this._cp1X = null
		this._cp1Y = null
		this._cp2X = null
		this._cp2Y = null
		this._type = 'L'

		this.updateParams()
		this.updated()

		return this
	}

	// Returns true if invoking the function may change the
	// command, i.e. returns false if a move 'M' or close 'Z'
	// command.
	canCurve() {
		return this._type !== 'M' && this._type !== 'Z'
	}

	// Converts the command to a curve based on the arguments
	// provided (or update the current curve).
	//
	// - If no arguments are provided then convert to a
	//   straight line.
	// - If the first two arguments are provided (cp1X and
	//   cp1Y) then convert to a quadratic curve.
	// - If the first four arguments are provided (cp1X,
	//   cp1Y, cp2X, cp2Y) then convert to a cubic curve.
	//
	// If canCurve returns false then no changes will be
	// made.
	curve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		if (!this.canCurve()) {
			return this
		}

		if (cp1X === null) {
			this.straighten()
		} else if (cp2X === null) {
			this._updateToQuadratic(cp1X, cp1Y)
		} else {
			this._updateToCubic(cp1X, cp1Y, cp2X, cp2Y)
		}

		this.updateParams()
		this.updated()

		return this
	}

	// Updates the paramter array with changes to the object.
	// This is used to construct the string used to populate
	// the 'd' attribute of a path.
	updateParams() {
		const indices = CommandIndices.get(this._type)
		this._params = new Array(indices.length)

		for (const name in indices) {
			const i = indices[name]
			const fieldName = '_' + name
			this._params[i] = this[fieldName]
		}
	}

	// Returns the command as a string in the form that can
	// be directly inserted into the full Path, e.g.
	// `M 10 20`.
	toString() {
		return this._params.join(' ')
	}

	_setFields(...params) {
		const paramIndexes = CommandIndices.get(params[0])

		for (const name in paramIndexes) {
			const i = paramIndexes[name]
			this['_' + name] = params[i]
		}

		this.updateParams()
	}

	_updateToQuadratic(cp1X, cp1Y) {
		this._cp1X = cp1X
		this._cp1Y = cp1Y
		this._cp2X = null
		this._cp2Y = null
		this._type = 'Q'
	}

	_updateToCubic(cp1X, cp1Y, cp2X, cp2Y) {
		this._cp1X = cp1X
		this._cp1Y = cp1Y
		this._cp2X = cp2X
		this._cp2Y = cp2Y
		this._type = 'C'
	}
}
