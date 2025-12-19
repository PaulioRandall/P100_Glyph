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

	test('toString', () => {
		const cmd = new Command('C', 5, 5, 10, 10, 20, 20)
		expect(cmd.toString()).toEqual('C 5 5 10 10 20 20')
	})

	test('straighten: from line', () => {
		const cmd = Command.line(10, 20)

		cmd.straighten()

		expect(cmd).toEqual(
			Command.line(10, 20) //
		)
	})

	test('straighten: from quadratic', () => {
		const cmd = Command.quadratic(10, 20, 30, 40)

		cmd.straighten()

		expect(cmd).toEqual(
			Command.line(30, 40) //
		)
	})

	test('straighten: from cubic', () => {
		const cmd = Command.cubic(10, 20, 30, 40, 50, 60)

		cmd.straighten()

		expect(cmd).toEqual(
			Command.line(50, 60) //
		)
	})

	test('curve: from line to line', () => {
		const cmd = Command.line(10, 20)

		cmd.curve()

		expect(cmd).toEqual(
			Command.line(10, 20) //
		)
	})

	test('curve: from quadratic to line', () => {
		const cmd = Command.quadratic(10, 20, 30, 40)

		cmd.curve()

		expect(cmd).toEqual(
			Command.line(30, 40) //
		)
	})

	test('curve: from cubic to line', () => {
		const cmd = Command.cubic(10, 20, 30, 40, 50, 60)

		cmd.curve()

		expect(cmd).toEqual(
			Command.line(50, 60) //
		)
	})

	test('curve: from line to quadratic', () => {
		const cmd = Command.line(10, 20)

		cmd.curve(30, 40)

		expect(cmd).toEqual(
			Command.quadratic(30, 40, 10, 20) //
		)
	})

	test('curve: from quadratic to quadratic', () => {
		const cmd = Command.quadratic(10, 20, 30, 40)

		cmd.curve(50, 60)

		expect(cmd).toEqual(
			Command.quadratic(50, 60, 30, 40) //
		)
	})

	test('curve: from cubic to quadratic', () => {
		const cmd = Command.cubic(10, 20, 30, 40, 50, 60)

		cmd.curve(70, 80)

		expect(cmd).toEqual(
			Command.quadratic(70, 80, 50, 60) //
		)
	})

	test('curve: from line to cubic', () => {
		const cmd = Command.line(10, 20)

		cmd.curve(30, 40, 50, 60)

		expect(cmd).toEqual(
			Command.cubic(30, 40, 50, 60, 10, 20) //
		)
	})

	test('curve: from quadratic to cubic', () => {
		const cmd = Command.quadratic(10, 20, 30, 40)

		cmd.curve(50, 60, 70, 80)

		expect(cmd).toEqual(
			Command.cubic(50, 60, 70, 80, 30, 40) //
		)
	})

	test('curve() from cubic to cubic', () => {
		const cmd = Command.cubic(10, 20, 30, 40, 50, 60)

		cmd.curve(70, 80, 90, 100)

		expect(cmd).toEqual(
			Command.cubic(70, 80, 90, 100, 50, 60) //
		)
	})
})
