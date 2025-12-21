import Path from './Path.js'
import Command from './Command.js'
import SubPath from './SubPath.js'

import {
	nu, //
	expectUpdateable, //
	expectUpdateables, //
} from './testutil.js'

describe('Path.js', () => {
	test('addCommand/removeCommand', () => {
		const p = new Path()
		const cmd = Command.move(10, 20)

		expect(cmd._updateFuncs.length).toEqual(0)
		p.addCommand(cmd)
		expect(cmd._updateFuncs.length).toEqual(1)
		p.removeCommand(cmd)
		expect(cmd._updateFuncs.length).toEqual(0)
	})

	test('moveTo(x,y)', () => {
		const p = new Path(20, 20)

		expectUpdateables(p.commands, [
			Command.move(20, 20), //
		])
	})

	test('lineTo()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]

		expectUpdateables(p.commands, [
			Command.move(20, 20), //
			Command.line(80, 20), //
		])
	})

	test('lineToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineToClose() // [2]

		expectUpdateables(p.commands, [
			Command.move(20, 20), //
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
			Command.move(20, 20), //
			Command.quadratic(20, 80, 80, 80), //
		])
	})

	test('quadraticToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.quadraticToClose(30, 40) // [2]

		expectUpdateables(p.commands, [
			Command.move(20, 20), //
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
			Command.move(20, 20), //
			Command.cubic(30, 50, 50, 70, 80, 80), //
		])
	})

	test('cubicToClose()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.cubicToClose(30, 40, 50, 60) // [2]

		expectUpdateables(p.commands, [
			Command.move(20, 20), //
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
			Command.move(20, 20), //
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
			Command.move(20, 20), //
			Command.line(80, 20), //
			Command.line(80, 80), //
		])
	})

	test('subPaths() when not closed', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]

		expectUpdateables(p.subPaths, [
			new SubPath(p, p.commands[1]), //
			new SubPath(p, p.commands[2]), //
		])
	})

	test('subPaths() when closed', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.lineTo(80, 80) // [2]
			.close() // [3]

		expectUpdateables(p.subPaths, [
			new SubPath(p, p.commands[1]),
			new SubPath(p, p.commands[2]),
		])
	})

	test('translateX()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.translateX(100)

		expectUpdateables(p.commands, [
			Command.move(120, 20), //
			Command.line(180, 20), //
		])
	})

	test('translateY()', () => {
		const p = new Path()
			.moveTo(20, 20) // [0]
			.lineTo(80, 20) // [1]
			.translateY(100)

		expectUpdateables(p.commands, [
			Command.move(20, 120), //
			Command.line(80, 120), //
		])
	})
})
