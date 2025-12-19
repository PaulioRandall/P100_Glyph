import List from './List.js'
import Updateable from './Updateable.js'
import CommandIndices from './CommandIndices.js'

// Represents an SVG path command.
//
// Only M, L, Q, C, and Z commands are supported.
//
// All mutation functions trigger a call to update except
// 'nu' prefixed functions. If using 'nu' prefixed
// functions, make sure to call update (or finish on a call
// to a function that calls update) to ensure other values
// are kept in sync and listeners are notified.
export default class Command extends Updateable {
	static move(x, y) {
		return new Command('M', x, y)
	}

	static line(x, y) {
		return new Command('L', x, y)
	}

	static quadratic(cp1X, cp1Y, x, y) {
		return new Command('Q', cp1X, cp1Y, x, y)
	}

	static cubic(cp1X, cp1Y, cp2X, cp2Y, x, y) {
		return new Command('C', cp1X, cp1Y, cp2X, cp2Y, x, y)
	}

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

	nuSetX(x) {
		this._errIfClose()
		this._x = Math.round(x)
		return this
	}

	setX(x) {
		this.nuSetX(x)
		this.update()
		return this
	}

	nuSetY(y) {
		this._errIfClose()
		this._y = Math.round(y)
		return this
	}

	setY(y) {
		this.nuSetY(y)
		this.update()
		return this
	}

	nuSetXY(x, y) {
		this._errIfClose()
		this._x = Math.round(x)
		this._y = Math.round(y)
		return this
	}

	setXY(x, y) {
		this.nuSetXY(x, y)
		this.update()
		return this
	}

	_errIfClose() {
		if (this._type === 'Z') {
			throw new Error("Command type must not be 'Z' to do that")
		}
	}

	nuSetCP1X(x) {
		this._errIfNotCurve()
		this._cp1X = Math.round(x)
		return this
	}

	setCP1X(x) {
		this.nuSetCP1X(x)
		this.update()
		return this
	}

	nuSetCP1Y(y) {
		this._errIfNotCurve()
		this._cp1Y = Math.round(y)
		return this
	}

	setCP1Y(y) {
		this.nuSetCP1Y(y)
		this.update()
		return this
	}

	nuSetCP1(x, y) {
		this._errIfNotCurve()
		this._cp1X = Math.round(x)
		this._cp1Y = Math.round(y)
		return this
	}

	setCP1(x, y) {
		this.nuSetCP1(x, y)
		this.update()
		return this
	}

	_errIfNotCurve() {
		if (this._type !== 'Q' && this._type !== 'C') {
			throw new Error('Command must be a curve to do that')
		}
	}

	nuSetCP2X(x) {
		this._errIfNotCurve()
		this._cp2X = Math.round(x)
		return this
	}

	setCP2X(x) {
		this.nuSetCP2X(x)
		this.update()
		return this
	}

	nuSetCP2Y(y) {
		this._errIfNotCurve()
		this._cp2Y = Math.round(y)
		return this
	}

	setCP2Y(y) {
		this.nuSetCP2Y(y)
		this.update()
		return this
	}

	nuSetCP2(x, y) {
		this._errIfNotCubic()
		this._cp2X = Math.round(x)
		this._cp2Y = Math.round(y)
		return this
	}

	setCP2(x, y) {
		this.nuSetCP2(x, y)
		this.update()
		return this
	}

	_errIfNotCubic() {
		if (this._type !== 'C') {
			throw new Error('Command must be cubic to do that')
		}
	}

	// Same as straighten but does not update parameters.
	//
	// You will need to call update after performing any
	// other 'nu' prefixed operations.
	nuStraighten() {
		this._errIfCantStraighten()

		if (this._type === 'L' || this._type === 'Z') {
			return this
		}

		this._cp1X = null
		this._cp1Y = null
		this._cp2X = null
		this._cp2Y = null
		this._type = 'L'

		return this
	}

	// Converts the command to a line command if not already
	// a line command. Will also do nothing if a close
	// command because they create straight lines too and we
	// don't want to open a closed path without the dev
	// user's explicit instruction.
	//
	// Move commands cannot be converted and will throw an
	// error.
	//
	// TODO: Allow users to specify optional x,y values at
	//       the end of the argument list.
	straighten() {
		this.nuStraighten()
		this.update()
		return this
	}

	_errIfCantStraighten() {
		if (this._type === 'M') {
			throw new Error("Move commands can't be straightened")
		}
	}

	nuCurve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		this._errIfCantCurve()

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
	//
	// Move and close commands cannot be converted and will
	// throw an error.
	//
	// TODO: Allow users to specify optional x,y values at
	//       the end of the argument list.
	curve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		this.nuCurve(cp1X, cp1Y, cp2X, cp2Y)
		this.update()
		return this
	}

	_errIfCantCurve() {
		if (this._type === 'M' || this._type === 'Z') {
			throw new Error("Move and close commands can't be curved")
		}
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

	clone() {
		return new Command(...this._params)
	}

	update() {
		this._remakeParams()
		super.update()
	}

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

	_remakeParams() {
		const indices = CommandIndices.get(this._type)
		this._params = new Array(indices.length)

		for (const name in indices) {
			const i = indices[name]
			const fieldName = '_' + name
			this._params[i] = this[fieldName]
		}
	}
}
