import PathCommand from './PathCommand.js'

describe('PathCommand.js', () => {
	test('values calculated correctly for close command', () => {
		const cmd = new PathCommand('Z')

		expect(cmd.x).toEqual(null)
		expect(cmd.y).toEqual(null)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for move command', () => {
		const cmd = new PathCommand('M', 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for line command', () => {
		const cmd = new PathCommand('L', 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for quadratic command', () => {
		const cmd = new PathCommand('Q', 5, 5, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(5)
		expect(cmd.cp2Y).toEqual(5)
	})

	test('values calculated correctly for cubic command', () => {
		const cmd = new PathCommand('C', 5, 5, 10, 10, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(10)
		expect(cmd.cp2Y).toEqual(10)
	})

	test('withXY()', () => {
		const cmd = PathCommand.cubicCurve(5, 5, 10, 10, 20, 20)
		const clone = cmd.withXY(50, 75)
		expect(clone).toEqual(PathCommand.cubicCurve(5, 5, 10, 10, 50, 75))
	})
})
