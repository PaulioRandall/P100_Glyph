import Updateable from './Updateable.js'
import List from './List.js'
import Command from './Command.js'

// A SubPath represents a visual line of a Path.
//
// They are exposed by the Path to allow manipulation of
// its commands in a way that an end user will often
// percieve it, i.e. as a line between two points in which
// either point can be moved, the line straightened or
// curved, the line remove, etc.
//
// Because the visual line drawn by a command is
// influenced by the command before or after it,
// a SubPath does not represent a single command, per se.
// However, there is core command that determines the shape
// of the drawn line. It is returned by the command getter.
//
// TODO: Should SubPath update if its command updates?
export default class SubPath extends Updateable {
	_path = null
	_cmd = null

	// This class is designed to be instantiated internally,
	// but it is possible to create one yourself. You don't
	// need to though. Each Path keeps an updated list of
	// SubPaths accessible through its 'subPaths' getter.
	constructor(path, cmd) {
		super()

		this._path = path
		this._cmd = cmd
	}

	// Gets the Path which the SubPath was produced by.
	get path() {
		return this._path
	}

	// Returns the command that draws the SubPath (or line
	// between path nodes).
	get command() {
		return this._cmd
	}

	// Returns the command containing the x,y point where the
	// SubPath starts.
	//
	// This always be the command before the SubPath's
	// command.
	get startCommand() {
		return this._path.commands.itemBefore(this._cmd)
	}

	// Returns true if the SubPath is still valid and calls
	// to methods that manipulate the path can be made.
	//
	// If the core command is replaced, in the parent Path,
	// by a method here, this SubPath's command will be
	// updated accordingly so the SubPath remains valid.
	//
	// Removing the SubPath or if it's core command is
	// replaced by an operation external to this SubPath will
	// invalidate this SubPath.
	inPath() {
		return this._path.containsCommand(this._cmd)
	}

	// Sets the x,y point on the command appearing before
	// this SubPath's command within the parent Path, i.e.
	// sets the start point of SubPath.
	setStart(x, y) {
		this._errIfNotInPath()

		this.startCommand.nuSetX(x).setY(y)

		this.update()
		return this
	}

	// Sets the x,y point on the underlying command. This
	// will also set the start point of the command appearing
	// afterwards within the parent Path.
	setEnd(x, y) {
		this._errIfNotInPath()

		this.command.nuSetX(x).setY(y)

		this.update()
		return this
	}

	// Returns true if a call to straighten is allowed.
	//
	// I.e. returns false if a move 'M' or close 'Z' command.
	canStraighten() {
		return this._cmd.canStraighten()
	}

	// Converts the underlying command to a line if not
	// already.
	//
	// Move commands cannot be converted and will throw an
	// error.
	straighten() {
		this._errIfNotInPath()

		if (this._cmd.type === 'L') {
			return this
		}

		this._cmd.straighten()

		this.update()
		return this
	}

	// Returns true if a call to curve is allowed.
	//
	// I.e. returns false if a move 'M' or close 'Z' command.
	canCurve() {
		return this._cmd.canCurve()
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
	curve(cp1X = null, cp1Y = null, cp2X = null, cp2Y = null) {
		this._errIfNotInPath()

		this._cmd.curve(cp1X, cp1Y, cp2X, cp2Y)

		this.update()
		return this
	}

	_errIfNotInPath() {
		if (!this.inPath()) {
			throw new Error('SubPath no longer part of its Path')
		}
	}
}
