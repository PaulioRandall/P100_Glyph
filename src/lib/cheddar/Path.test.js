import Path from './Path.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

// Clear the list of update funcs because I can't
// mock them.
function clearUpdateFuncs(path) {
	path.commands.forEach((cmd) => cmd._updateFuncs.clear())
	path.subPaths.forEach((sp) => sp._updateFuncs.clear())
}

describe('Path.js', () => {
	test('addCommand/removeCommand', () => {
		const p = new Path()
		const cmd = Command.move(10, 20)

		expect(cmd._updateFuncs.length).toEqual(0)
		p.addCommand(cmd)
		expect(cmd._updateFuncs.length).toEqual(1)
		p.removeCommand(cmd)
		expect(cmd._updateFuncs.length).toEqual(0)
	})

	test('moveTo(x,y)', () => {
		const p = new Path() //
			.moveTo(20, 20) // [0]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
		])
	})

	test('lineToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineToClose() // [2]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
			new Command('L', 20, 20), //
			new Command('Z'), //
		])
	})

	test('quadraticTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(20, 80, 80, 80) // [1]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('Q', 20, 80, 80, 80), //
		])
	})

	test('quadraticToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.quadraticToClose(30, 40) // [2]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
			new Command('Q', 30, 40, 20, 20), //
			new Command('Z'), //
		])
	})

	test('cubicTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(30, 50, 50, 70, 80, 80) // [1]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('C', 30, 50, 50, 70, 80, 80), //
		])
	})

	test('cubicToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.cubicToClose(30, 40, 50, 60) // [2]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
			new Command('C', 30, 40, 50, 60, 20, 20), //
			new Command('Z'), //
		])
	})

	test('close()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
			new Command('L', 80, 80), //
			new Command('Z'), //
		])
	})

	test('open()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]
			.lineTo(80, 20) // [2]
			.lineTo(80, 80) // [3]
			.open() // [4]

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
			new Command('L', 80, 80), //
		])
	})

	test('subPaths() when not closed', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]

		clearUpdateFuncs(p)

		expect(p.subPaths).toEqual([
			new SubPath(p, p.commands[1]),
			new SubPath(p, p.commands[2]),
		])
	})

	test('subPaths() when closed', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

		clearUpdateFuncs(p)

		expect(p.subPaths).toEqual([
			new SubPath(p, p.commands[1]),
			new SubPath(p, p.commands[2]),
		])
	})

	test('translateX()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.translateX(100)

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			Command.move(120, 20), //
			Command.line(180, 20), //
		])
	})

	test('translateY()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.translateY(100)

		clearUpdateFuncs(p)

		expect(p.commands).toEqual([
			Command.move(20, 120), //
			Command.line(80, 120), //
		])
	})
})
