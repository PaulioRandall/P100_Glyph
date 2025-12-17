import Path from './Path.js'
import PathCommand from './PathCommand.js'
import SubPath from './SubPath.js'

describe('Path.js', () => {
	test('moveTo(x,y)', () => {
		const p = new Path().moveTo(20, 20) // [0]

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
		])
	})

	test('quadCurveTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadCurveTo(20, 80, 80, 80) // [1]

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('Q', 20, 80, 80, 80), //
		])
	})

	test('cubicCurveTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicCurveTo(30, 50, 50, 70, 80, 80) // [1]

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('C', 30, 50, 50, 70, 80, 80), //
		])
	})

	test('close()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
			new PathCommand('L', 80, 80), //
			new PathCommand('Z'), //
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
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
			new PathCommand('L', 80, 80), //
		])
	})

	test('subPaths() when not closed', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]

		expect(p.subPaths).toEqual([
			new SubPath(p, p.commands[1]),
			new SubPath(p, p.commands[2]),
		])
	})

	test('replaceCommand()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		const currCmd = p.commands[1]
		const newCmd = new PathCommand('L', 40, 40)
		p.replaceCommand(currCmd, newCmd)

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 40, 40), //
		])
	})
})
