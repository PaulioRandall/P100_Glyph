import Group from './Group.js'
import Circle from './Circle.js'
import Path from './Path.js'

describe('Group.js', () => {
	test('add/remove', () => {
		const c = new Circle(10, 20)
		const g = new Group()

		expect(c._updateFuncs.length).toEqual(0)
		g.add(c)
		expect(c._updateFuncs.length).toEqual(1)
		g.remove(c)
		expect(c._updateFuncs.length).toEqual(0)
	})

	test('clear', () => {
		const g = new Group() //
			.add(new Circle(10, 20)) //
			.add(new Circle(30, 40)) //
			.add(new Circle(50, 60)) //

		expect(g.length).toEqual(3)
		g.clear()
		expect(g.length).toEqual(0)
	})

	test('translateX', () => {
		const c = new Circle(20, 30)
		const p = new Path(40, 50).lineTo(60, 70)

		const g = new Group() //
			.add(c) //
			.add(p) //
			.translateX(100) //

		expect(c.centerX).toEqual(120)
		expect(p.commands[0].x).toEqual(140)
		expect(p.commands[1].x).toEqual(160)
	})

	test('translateY', () => {
		const c = new Circle(20, 30)
		const p = new Path(40, 50).lineTo(60, 70)

		const g = new Group() //
			.add(c) //
			.add(p) //
			.translateY(100) //

		expect(c.centerY).toEqual(130)
		expect(p.commands[0].y).toEqual(150)
		expect(p.commands[1].y).toEqual(170)
	})
})
