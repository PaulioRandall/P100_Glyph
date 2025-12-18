import Path from './Path.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

describe('Path.js', () => {
	test('moveTo(x,y)', () => {
		const p = new Path().moveTo(20, 20) // [0]

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('L', 80, 20), //
		])
	})

	test('quadCurveTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadCurveTo(20, 80, 80, 80) // [1]

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('Q', 20, 80, 80, 80), //
		])
	})

	test('cubicCurveTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicCurveTo(30, 50, 50, 70, 80, 80) // [1]

		expect(p.commands).toEqual([
			new Command('M', 20, 20), //
			new Command('C', 30, 50, 50, 70, 80, 80), //
		])
	})

	test('close()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

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

		// Clear the list of update funcs because I can't
		// mock them.
		p.subPaths.forEach((sp) => sp._updateFuncs.clear())

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

		// Clear the list of update funcs because I can't
		// mock them.
		p.subPaths.forEach((sp) => sp._updateFuncs.clear())

		expect(p.subPaths).toEqual([
			new SubPath(p, p.commands[1]),
			new SubPath(p, p.commands[2]),
			new SubPath(p, p.commands[3]),
		])
	})
})
