import Path from './Path.js'
import Command from './Command.js'

describe('Line.js', () => {
	test('start()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expect(p.lines[0].start).toEqual({ x: 20, y: 20 })
	})

	test('end() when not a close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expect(p.lines[0].end).toEqual({ x: 80, y: 20 })
	})

	test('end() when a close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.close() // [2]

		expect(p.lines[1].end).toEqual({ x: 20, y: 20 })
	})

	test('setStart()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		p.lines[0].setStart(40, 50)

		expect(p.lines[0].start).toEqual({ x: 40, y: 50 })
		expect(p.commands[0].x).toEqual(40)
		expect(p.commands[0].y).toEqual(50)
	})

	test('setEnd()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]

		p.lines[0].setEnd(40, 50)

		expect(p.lines[0].end).toEqual({ x: 40, y: 50 })
		expect(p.commands[1].x).toEqual(40)
		expect(p.commands[1].y).toEqual(50)
	})

	test('setEnd() for close command', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.close() // [2]

		p.lines[1].setEnd(40, 50)

		expect(p.lines[1].end).toEqual({ x: 40, y: 50 })
		expect(p.commands[0].x).toEqual(40)
		expect(p.commands[0].y).toEqual(50)
	})

	test('straighten() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.lines[0].straighten()

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadCurveTo(40, 50, 80, 80) // [1]

		p.lines[0].straighten()

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicCurveTo(40, 40, 50, 50, 80, 80) // [1]

		p.lines[0].straighten()

		expect(p.commands[1]).toEqual(
			Command.line(80, 80) //
		)
	})

	test('straighten() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.lines[0].straighten()

		expect(p.commands[1]).toEqual(
			Command.close() //
		)
	})

	test('convertToQuadratic() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.lines[0].convertToQuadratic(20, 80)

		expect(p.commands[1]).toEqual(
			Command.quadCurve(20, 80, 80, 80) //
		)
	})

	test('convertToQuadratic() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadCurveTo(40, 50, 80, 80) // [1]

		p.lines[0].convertToQuadratic(20, 80)

		expect(p.commands[1]).toEqual(
			Command.quadCurve(20, 80, 80, 80) //
		)
	})

	test('convertToQuadratic() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicCurveTo(40, 40, 50, 50, 80, 80) // [1]

		p.lines[0].convertToQuadratic(20, 80)

		expect(p.commands[1]).toEqual(
			Command.quadCurve(20, 80, 80, 80) //
		)
	})

	test('convertToQuadratic() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.lines[0].convertToQuadratic(20, 80)

		expect(p.commands[1]).toEqual(
			Command.quadCurve(20, 80, 20, 20) //
		)

		expect(p.commands[2]).toEqual(
			Command.close() //
		)
	})

	test('convertToCubic() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.lines[0].convertToCubic(40, 40, 50, 50)

		expect(p.commands[1]).toEqual(
			Command.cubicCurve(40, 40, 50, 50, 80, 80) //
		)
	})

	test('convertToCubic() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadCurveTo(40, 40, 80, 80) // [1]

		p.lines[0].convertToCubic(40, 40, 50, 50)

		expect(p.commands[1]).toEqual(
			Command.cubicCurve(40, 40, 50, 50, 80, 80) //
		)
	})

	test('convertToCubic() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicCurveTo(30, 30, 70, 70, 80, 80) // [1]

		p.lines[0].convertToCubic(40, 40, 50, 50)

		expect(p.commands[1]).toEqual(
			Command.cubicCurve(40, 40, 50, 50, 80, 80) //
		)
	})

	test('convertToCubic() from close', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]

		p.lines[0].convertToCubic(40, 40, 50, 50)

		expect(p.commands[1]).toEqual(
			Command.cubicCurve(40, 40, 50, 50, 20, 20) //
		)

		expect(p.commands[2]).toEqual(
			Command.close() //
		)
	})
})
