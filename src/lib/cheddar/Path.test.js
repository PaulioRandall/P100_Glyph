import Path from './Path.js'
import PathCommand from './PathCommand.js'

describe('Path.js', () => {
	test('moveTo(x,y)', () => {
		const p = new Path()

		p.moveTo(20, 20)

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()

		p.moveTo(20, 20)
		p.lineTo(80, 20)

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
		])
	})

	test('quadCurveTo()', () => {
		const p = new Path()

		p.moveTo(20, 20)
		p.quadCurveTo(20, 80, 80, 80)

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('Q', 20, 80, 80, 80), //
		])
	})

	test('cubicCurveTo()', () => {
		const p = new Path()

		p.moveTo(20, 20)
		p.cubicCurveTo(30, 50, 50, 70, 80, 80)

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('C', 30, 50, 50, 70, 80, 80), //
		])
	})

	test('close()', () => {
		const p = new Path()

		p.moveTo(20, 20)
		p.lineTo(80, 20)
		p.lineTo(80, 80)
		p.close()

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
			new PathCommand('L', 80, 80), //
			new PathCommand('Z'), //
		])
	})

	test('open()', () => {
		const p = new Path()

		p.moveTo(20, 20)
		p.close()
		p.lineTo(80, 20)
		p.lineTo(80, 80)
		p.open()

		expect(p.commands).toEqual([
			new PathCommand('M', 20, 20), //
			new PathCommand('L', 80, 20), //
			new PathCommand('L', 80, 80), //
		])
	})
})
