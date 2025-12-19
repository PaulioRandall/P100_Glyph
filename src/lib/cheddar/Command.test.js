import Command from './Command.js'

describe('Command.js', () => {
	test('setXY', () => {
		const cmd = Command.line(0, 0)

		cmd.setXY(10, 20)

		expect(cmd.x).toEqual(10)
		expect(cmd.y).toEqual(20)
	})

	test('values calculated correctly for close command', () => {
		const cmd = Command.close('Z')

		expect(cmd.x).toEqual(null)
		expect(cmd.y).toEqual(null)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for move command', () => {
		const cmd = Command.move(20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for line command', () => {
		const cmd = Command.line(20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for quadratic command', () => {
		const cmd = Command.quadratic(5, 5, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('values calculated correctly for cubic command', () => {
		const cmd = Command.cubic(5, 5, 10, 10, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(10)
		expect(cmd.cp2Y).toEqual(10)
	})
})
