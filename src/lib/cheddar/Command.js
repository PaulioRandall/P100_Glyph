import List from './List.js'
import Updateable from './Updateable.js'
import CommandIndices from './CommandIndices.js'

// An SVG path command. It's immutable from the user dev's
// perspective. They should replace existing commands
// in the path if they want to make a change.
//
// Commands are always absolute, i.e. uppercase type.
//
// Arcs and curve shortcuts are not supported, this
// includes 'A', 'S', and 'T' command types.
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

		this._setFields(params)
		this.update()
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

	setXY(x, y) {
		this._x = Math.round(x)
		this._y = Math.round(y)
		this.update()
		return this
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

	_setFields(params) {
		const paramIndexes = CommandIndices.get(params[0])

		for (const name in paramIndexes) {
			const i = paramIndexes[name]
			this['_' + name] = params[i]
		}
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
