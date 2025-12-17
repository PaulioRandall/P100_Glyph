import Path from './Path.js'
import SubPath from './SubPath.js'

describe('SubPath.js', () => {
	test('start()', () => {
		const p = new Path()
		p.moveTo(20, 20)
		const cmd = p.lineTo(80, 20)

		const sp = new SubPath(p, cmd)
		expect(sp.start).toEqual({ x: 20, y: 20 })
	})

	test('end() when not a close command', () => {
		const p = new Path()
		p.moveTo(20, 20)
		const cmd = p.lineTo(80, 20)

		const sp = new SubPath(p, cmd)
		expect(sp.end).toEqual({ x: 80, y: 20 })
	})

	test('end() when a close command', () => {
		const p = new Path()
		p.moveTo(20, 20)
		p.lineTo(80, 20)
		p.close()

		const cmd = p.commands.last()
		const sp = new SubPath(p, cmd)
		expect(sp.end).toEqual({ x: 20, y: 20 })
	})

	test('setStart()', () => {
		const p = new Path()
		p.moveTo(20, 20)
		const cmd = p.lineTo(80, 20)

		const sp = new SubPath(p, cmd)
		sp.setStart(40, 50)

		expect(sp.start).toEqual({ x: 40, y: 50 })
		expect(p.commands[0].x).toEqual(40)
		expect(p.commands[0].y).toEqual(50)
	})

	test('setEnd()', () => {
		const p = new Path()
		p.moveTo(20, 20) // [0]
		p.lineTo(80, 20) // [1]
		p.lineTo(80, 80) // [2]

		const sp = new SubPath(p, p.commands[1])
		sp.setEnd(40, 50)

		expect(sp.end).toEqual({ x: 40, y: 50 })
		expect(p.commands[1].x).toEqual(40)
		expect(p.commands[1].y).toEqual(50)
	})
})
