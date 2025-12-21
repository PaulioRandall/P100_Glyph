import Path from './Path.js'
import Command from './Command.js'

import {
	nu, //
	expectUpdateable, //
	expectUpdateables, //
} from './testutil.js'

describe('SubPath.js', () => {
	test('command()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expectUpdateable(
			p.subPaths[0].command, //
			p.commands[1] //
		)
	})

	test('startCommand()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expectUpdateable(
			p.subPaths[0].startCommand, //
			p.commands[0] //
		)
	})

	test('setStart()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		p.subPaths[0].setStart(40, 50)

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

		expect(p.subPaths[0].command.x).toEqual(40)
		expect(p.subPaths[0].command.y).toEqual(50)
		expect(p.commands[1].x).toEqual(40)
		expect(p.commands[1].y).toEqual(50)
	})

	test('straighten() from line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].straighten()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	test('straighten() from quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].straighten()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	test('straighten() from cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].straighten()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	// CURVE

	test('curve() from line to line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	test('curve() from quadratic to line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].curve()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	test('curve() from cubic to line', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].curve()

		expectUpdateable(
			p.commands[1], //
			Command.line(80, 80) //
		)
	})

	test('curve() from line to quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		expectUpdateable(
			p.commands[1], //
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from quadratic to quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 50, 80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		expectUpdateable(
			p.commands[1], //
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from cubic to quadratic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(40, 40, 50, 50, 80, 80) // [1]

		p.subPaths[0].curve(20, 80)

		expectUpdateable(
			p.commands[1], //
			Command.quadratic(20, 80, 80, 80) //
		)
	})

	test('curve() from line to cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		expectUpdateable(
			p.commands[1], //
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})

	test('curve() from quadratic to cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(40, 40, 80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		expectUpdateable(
			p.commands[1], //
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})

	test('curve() from cubic to cubic', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(30, 30, 70, 70, 80, 80) // [1]

		p.subPaths[0].curve(40, 40, 50, 50)

		expectUpdateable(
			p.commands[1], //
			Command.cubic(40, 40, 50, 50, 80, 80) //
		)
	})
})
