/*
import Cheddar from '$cheddar'

class SVG {
	commands // [Command]

	setSize(w,h) {}
	
	pushShape(shape) {}
	popShape() {}
	unshiftShape(shape) {}
	shiftShape() {}

	addShape(i, shape) {}
	getShape(i) {}
	setShape(iOrShape, shape) {}
	delShape(iOrShape) {}
}

class Path {
	commands // [Command]
	
	close() {}
	open() {}

	toString() // ""
	getLine(i) { return new Line() }
	getVertex(i) { return new Point() }
}

// Generic form of a command. 
class Command {
	type // ""
	setType(type) {}

	// Not sure which are needed yet.
	parameters() { return [0] }

	pushParameter(p) {}
	popParameter() {}
	unshiftParameter(p) {}
	shiftParameter() {}

	addParameter(i, p) {}
	getParameter(i) {}
	setParameter(iOrP, p) {}
	delParameter(iOrP) {}
}

class Point {
	x // 0
	y // 0
	set(x,y) {}
	setX(x) {}
	setY(y) {}
}

class Vertex {

}

// Generic embed for Lines
class PointCommand {
	_command = new Command()

	// Not sure which are needed yet.
	pushPoint(p) {}
	popPoint() {}
	unshiftPoint(p) {}
	shiftPoint() {}

	addPoint(i, p) {}
	getPoint(i) {}
	setPoint(iOrP, p) {} // 'putPoint' ??
	delPoint(iOrP) {}
}

// Lines are not created by the user, but are provided to
// them to manipulate existing commands.
class Line {
	type // ""

	// Returns the start vertex of the line.
	start() { return new Point() }

	// Returns the end vertex of the line.
	end() { return new Point() }

	// Returns the control point detailing how the whole line
	// curves start if quadratic or how the start of the line
	// curves if cubic.
	//
	// Will be null if an 'L' or 'Z' command. 
	startControlPoint() { return new Point() }

	// Returns the control point detailing how the end of
	// the line curves.
	//
	// Will be null if an 'L', 'Q', or 'Z' command.
	endControlPoint() { return new Point() }	
}

// container being the DOM element containing the SVG.
const svg = new Cheddar.SVG(container)

// Sets the size of the viewbox.
//
// `viewBox="0 0 100 100"`
svg.setSize(100, 100)

// Create a new path without any vertices.
const path = new Cheddar.Path()

// Moves to the specified point (x,y).
path.moveTo(10, 10)
path.addCommand('M', 10, 10)
path.addCommand('M 10, 10')

// Draws a straight line from the current point to the
// specified point.
//
// "L" x y
// `L 10 20`
path.lineTo(10, 20)
path.curveTo(10, 20)
path.addCommand('L', 10, 12)
path.addCommand('L 10 12')

// Draws a quadratic curved line from the current point to
// the specified point.
//
// "Q" CP1.x CP1.y x y
// `Q 15 25 20 20`
path.lineTo(15, 25, 20, 20)
path.curveTo(15, 25, 20, 20)
path.addCommand('Q', 15, 25, 20, 20)
path.addCommand('Q 15 25 20 20')

// Draws a cubic curved line from the current point to
// the specified point.
//
// "C" CP1.x CP1.y CP2.x CP2.y x y
// `C 12 25 18 25 20 20`
path.lineTo(12, 25, 18, 25, 20, 20)
path.curveTo(12, 25, 18, 25, 20, 20)
path.addCommand('C', 12, 25, 18, 25, 20, 20)
path.addCommand('C 12 25 18 25 20 20')

// Closes the path if not already closed. Adding new
// vertices will always move the close command to the end
// of the full path command.
//
// "Z" 
path.close()

// Opens the path if not already opened. Essentially
// removes any "Z" from the end of the full command.
path.open()

// Returns the list of all commands in the order they
// are executed.
const commands = path.getCommands()

// Returns the concaternated list of commands, or 'd'
// value of the path. That is, the list of commands in the
// format set as the 'd' attribute of the path when
// rendered.
const pathCommandString = path.getCommandString()

// Returns the first line of the path.
//
// Only 'L', 'Q', 'C', and 'Z' commands are interpreted
// as lines, thus, getting the first line involes iterating
// the command list to the instance of one of those
// commands. 
const firstLine = getLine(0)



const firstVertex = getVertex()


*/
