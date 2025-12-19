import Path from './Path.js'
import Command from './Command.js'

// TODO: Modify tests to remove dependency on Path.

// Clear the list of update funcs because I can't
// mock them.
function clearUpdateFuncs(path) {
	path.commands.forEach((cmd) => cmd._updateFuncs.clear())
	path.subPaths.forEach((sp) => sp._updateFuncs.clear())
}

describe('SubPath.js', () => {
	test('startCommand()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		clearUpdateFuncs(p)

		expect(p.subPaths[0].startCommand).toEqual(
			p.commands[0] //
		)
	})

	test('endCommand() when not a close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		clearUpdateFuncs(p)

		expect(p.subPaths[0].endCommand).toEqual(
			p.commands[1] //
		)
	})

	test('end() when a close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.close() // [2]

		clearUpdateFuncs(p)

		expect(p.subPaths[1].endCommand).toEqual(
			p.commands[0] //
		)
	})

	test('setStart()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		p.subPaths[0].setStart(40, 50)

		clearUpdateFuncs(p)

		expect(p.subPaths[0].startCommand.x).toEqual(40)
		expect(p.subPaths[0].startCommand.y).toEqual(50)
		expect(p.commands[0].x).toEqual(40)
		expect(p.commands[0].y).toEqual(50)
	})

	test('setEnd()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]

		p.subPaths[0].setEnd(40, 50)

		clearUpdateFuncs(p)

		expect(p.subPaths[0].endCommand.x).toEqual(40)
		expect(p.subPaths[0].endCommand.y).toEqual(50)
		expect(p.commands[1].x).toEqual(40)
		expect(p.commands[1].y).toEqual(50)
	})

	test('setEnd() for close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.close() // [2]

		p.subPaths[1].setEnd(40, 50)

		clearUpdateFuncs(p)

		expect(p.subPaths[1].endCommand.x).toEqual(40)
		expect(p.subPaths[1].endCommand.y).toEqual(50)
		expect(p.commands[0].x).toEqual(40)
		expect(p.commands[0].y).toEqual(50)
	})

	test('straighten() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].straighten()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].straighten()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].straighten()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.subPaths[0].straighten()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.close() //
		)
	})

	// CURVE

	test('curve() from line to line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('curve() from quadratic to line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].curve()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('curve() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].curve()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('curve() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.subPaths[0].curve()

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.close() //
		)
	})

	test('curve() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.subPaths[0].curve(20, 80)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.quadratic(20, 80, 20, 20) //
		)

		expect(p.commands[2]).toEqual(
			Command.close() //
		)
	})

	test('curve() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})

	test('curve() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 40, 80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})

	test('curve() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(30, 30, 70, 70, 80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})

	test('curve() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		clearUpdateFuncs(p)

		expect(p.commands[1]).toEqual(
			Command.cubic(40, 40, 50, 50, 20, 20) //
		)

		expect(p.commands[2]).toEqual(
			Command.close() //
		)
	})
})
