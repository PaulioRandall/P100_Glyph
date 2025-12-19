import Command from './Command.js'

describe('Command.js', () => {
	test('move (static)', () => {
		const cmd = Command.move(20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('line (static)', () => {
		const cmd = Command.line(20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('quadratic (static)', () => {
		const cmd = Command.quadratic(5, 5, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('cubic (static)', () => {
		const cmd = Command.cubic(5, 5, 10, 10, 20, 20)

		expect(cmd.x).toEqual(20)
		expect(cmd.y).toEqual(20)

		expect(cmd.cp1X).toEqual(5)
		expect(cmd.cp1Y).toEqual(5)

		expect(cmd.cp2X).toEqual(10)
		expect(cmd.cp2Y).toEqual(10)
	})

	test('close (static)', () => {
		const cmd = Command.close('Z')

		expect(cmd.x).toEqual(null)
		expect(cmd.y).toEqual(null)

		expect(cmd.cp1X).toEqual(null)
		expect(cmd.cp1Y).toEqual(null)

		expect(cmd.cp2X).toEqual(null)
		expect(cmd.cp2Y).toEqual(null)
	})

	test('params', () => {
		const cmd = new Command('C', 5, 5, 10, 10, 20, 20)
		expect(cmd.params).toEqual(['C', 5, 5, 10, 10, 20, 20])
	})

	test('setX', () => {
		const cmd = Command.line(0, 0)

		cmd.setX(10)

		expect(cmd.x).toEqual(10)
		expect(cmd.params[1]).toEqual(10)
	})

	test('setY', () => {
		const cmd = Command.line(0, 0)

		cmd.setY(20)

		expect(cmd.y).toEqual(20)
		expect(cmd.params[2]).toEqual(20)
	})

	test('setXY', () => {
		const cmd = Command.line(0, 0)

		cmd.setXY(10, 20)

		expect(cmd.x).toEqual(10)
		expect(cmd.y).toEqual(20)
		expect(cmd.params[1]).toEqual(10)
		expect(cmd.params[2]).toEqual(20)
	})

	test('setCP1X', () => {
		const cmd = Command.quadratic(0, 0, 0, 0)

		cmd.setCP1X(10)

		expect(cmd.cp1X).toEqual(10)
		expect(cmd.params[1]).toEqual(10)
	})

	test('setCP1Y', () => {
		const cmd = Command.quadratic(0, 0, 0, 0)

		cmd.setCP1Y(20)

		expect(cmd.cp1Y).toEqual(20)
		expect(cmd.params[2]).toEqual(20)
	})

	test('setCP1', () => {
		const cmd = Command.quadratic(0, 0, 0, 0)

		cmd.setCP1(10, 20)

		expect(cmd.cp1X).toEqual(10)
		expect(cmd.cp1Y).toEqual(20)
		expect(cmd.params[1]).toEqual(10)
		expect(cmd.params[2]).toEqual(20)
	})

	test('setCP2X', () => {
		const cmd = Command.cubic(0, 0, 0, 0, 0, 0)

		cmd.setCP2X(10)

		expect(cmd.cp2X).toEqual(10)
		expect(cmd.params[3]).toEqual(10)
	})

	test('setCP2Y', () => {
		const cmd = Command.cubic(0, 0, 0, 0, 0, 0)

		cmd.setCP2Y(20)

		expect(cmd.cp2Y).toEqual(20)
		expect(cmd.params[4]).toEqual(20)
	})

	test('setCP2', () => {
		const cmd = Command.cubic(0, 0, 0, 0, 0, 0)

		cmd.setCP2(10, 20)

		expect(cmd.cp2X).toEqual(10)
		expect(cmd.cp2Y).toEqual(20)
		expect(cmd.params[3]).toEqual(10)
		expect(cmd.params[4]).toEqual(20)
	})

	test('toString', () => {
		const cmd = new Command('C', 5, 5, 10, 10, 20, 20)
		expect(cmd.toString()).toEqual('C 5 5 10 10 20 20')
	})
})
