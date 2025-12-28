import Path from './Path.js'
import Command from './Command.js'

import {
	nu, //
	expectUpdateable, //
	expectUpdateables, //
} from './testutil.js'

describe('Path.js', () => {
	test('addCommand/removeCommand', () => {
		const p = new Path()
		const cmd = Command.moveBy(10, 20)

		expect(cmd._listeners.length).toEqual(0)
		p.addCommand(cmd)
		expect(cmd._listeners.length).toEqual(1)
		p.removeCommand(cmd)
		expect(cmd._listeners.length).toEqual(0)
	})

	test('clear', () => {
		const p = new Path() //
			.moveTo(10, 20) //
			.lineTo(30, 40) //
			.quadraticToClose(50, 60) //

		p.clear()

		expect(p.commands.length).toEqual(0)
	})

	test('moveTo(x,y)', () => {
		const p = new Path(20, 20)

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
		])
	})

	test('lineToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineToClose() // [2]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
			Command.line(20, 20), //
			Command.close(), //
		])
	})

	test('quadraticTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.quadraticTo(20, 80, 80, 80) // [1]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.quadratic(20, 80, 80, 80), //
		])
	})

	test('quadraticToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.quadraticToClose(30, 40) // [2]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
			Command.quadratic(30, 40, 20, 20), //
			Command.close(), //
		])
	})

	test('cubicTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.cubicTo(30, 50, 50, 70, 80, 80) // [1]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.cubic(30, 50, 50, 70, 80, 80), //
		])
	})

	test('cubicToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.cubicToClose(30, 40, 50, 60) // [2]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
			Command.cubic(30, 40, 50, 60, 20, 20), //
			Command.close(), //
		])
	})

	test('close()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
			Command.line(80, 80), //
			Command.close(), //
		])
	})

	test('open()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.close() // [1]
			.lineTo(80, 20) // [2]
			.lineTo(80, 80) // [3]
			.open() // [4]

		expectUpdateables(p.commands, [
			Command.moveBy(20, 20), //
			Command.line(80, 20), //
			Command.line(80, 80), //
		])
	})

	test('moveX()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.moveX(100)

		expectUpdateables(p.commands, [
			Command.moveBy(120, 20), //
			Command.line(180, 20), //
		])
	})

	test('moveY()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.moveY(100)

		expectUpdateables(p.commands, [
			Command.moveBy(20, 120), //
			Command.line(80, 120), //
		])
	})

	test('moveBy()', () => {
		const p = new Path()
			.moveTo(20, 30) // [0]
			.lineTo(40, 50) // [1]
			.moveBy(100, 200)

		expectUpdateables(p.commands, [
			Command.moveBy(120, 230), //
			Command.line(140, 250), //
		])
	})
})
