import List from './List.js'
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
			this.update()
		}
		return this
	}

	// Sets the Y value.
	setY(y) {
		if (this._y !== null) {
			this._y = y
			this.update()
		}
		return this
	}

	// Sets the X value of the first control point.
	setCP1X(x) {
		if (this._cp1X !== null) {
			this._cp1X = x
			this.update()
		}
		return this
	}

	// Sets the Y value of the first control point.
	setCP1Y(y) {
		if (this._cp1Y !== null) {
			this._cp1Y = y
			this.update()
		}
		return this
	}

	// Sets the X value of the first control point.
	setCP2X(x) {
		if (this._cp2X !== null) {
			this._cp2X = x
			this.update()
		}
		return this
	}

	// Sets the Y value of the first control point. Throws an
	// error if the command is not a cubic curve.
	setCP2Y(y) {
		if (this._cp2Y !== null) {
			this._cp2Y = y
			this.update()
		}
		return this
	}

	// Moves the command destination X point by dx, which may
	// be negative.
	moveX(dx) {
		if (this._x !== null) {
			this._x += dx
		}

		if (this._cp1X !== null) {
			this._cp1X += dx
		}

		if (this._cp2X !== null) {
			this._cp2X += dx
		}

		this.update()
		return this
	}

	// Moves the command destination Y point by dx, which may
	// be negative.
	moveY(dy) {
		if (this._y !== null) {
			this._y += dy
		}

		if (this._cp1Y !== null) {
			this._cp1Y += dy
		}

		if (this._cp2Y !== null) {
			this._cp2Y += dy
		}

		this.update()
		return this
	}

	// Returns true if a call to straighten is allowed.
	//
	// I.e. returns false if a move 'M' or close 'Z' command.
	canStraighten() {
		return this._type !== 'M' && this._type !== 'Z'
	}

	// Converts the command to a line command if not already
	// a line command. Will also do nothing if a close
	// command because they create straight lines too and we
	// don't want to open a closed path without the dev
	// user's explicit instruction.
	straighten() {
		if (!this.canStraighten()) {
			return this
		}

		if (this._type === 'L') {
			return this
		}

		this._cp1X = null
		this._cp1Y = null
		this._cp2X = null
		this._cp2Y = null
		this._type = 'L'

		this.update()
		return this
	}

	// Returns true if a call to curve is allowed.
	//
	// I.e. returns false if a move 'M' or close 'Z' command.
	canCurve() {
		return this._type !== 'M' && this._type !== 'Z'
	}

	// curve without calling update.
	nuCurve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		if (!this.canCurve()) {
			throw new Error("Move and close commands can't be curved")
		}

		if (cp1X === null) {
			this.straighten()
			return this
		}

		if (cp2X === null) {
			this._updateToQuadratic(cp1X, cp1Y)
			return this
		}

		this._updateToCubic(cp1X, cp1Y, cp2X, cp2Y)
		return this
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
	curve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		if (!this.canCurve()) {
			return this
		}

		if (cp1X === null) {
			this.straighten()
			this.update()
			return this
		}

		if (cp2X === null) {
			this._updateToQuadratic(cp1X, cp1Y)
			this.update()
			return this
		}

		this._updateToCubic(cp1X, cp1Y, cp2X, cp2Y)
		this.update()

		return this
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

	update() {
		this._generateParams()
		super.update()
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

		this.update()
	}

	_generateParams() {
		const indices = CommandIndices.get(this._type)
		this._params = new Array(indices.length)

		for (const name in indices) {
			const i = indices[name]
			const fieldName = '_' + name
			this._params[i] = this[fieldName]
		}
	}
}
