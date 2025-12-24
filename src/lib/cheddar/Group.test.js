import Group from './Group.js'
import Circle from './Circle.js'
import Path from './Path.js'

describe('Group.js', () => {
	test('update', () => {
		const g1 = new Group()
		const g2 = new Group()
		const g3 = new Group()

		g2.add(g3)
		g1.add(g2)

		let g1Called = 0
		g1.onUpdate(() => g1Called++)

		let g2Called = 0
		g2.onUpdate(() => g2Called++)

		let g3Called = 0
		g3.onUpdate(() => g3Called++)

		expect(g3Called).toEqual(0)
		expect(g2Called).toEqual(0)
		expect(g1Called).toEqual(0)

		g3.update()

		expect(g3Called).toEqual(1)
		expect(g2Called).toEqual(1)
		expect(g1Called).toEqual(1)
	})

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

		expect(g.size).toEqual(3)
		g.clear()
		expect(g.size).toEqual(0)
	})

	test('moveX', () => {
		const c = new Circle(20, 30)
		const p = new Path(40, 50).lineTo(60, 70)

		const g = new Group() //
			.add(c) //
			.add(p) //
			.moveX(100) //

		expect(c.centerX).toEqual(120)
		expect(p.commands[0].x).toEqual(140)
		expect(p.commands[1].x).toEqual(160)
	})

	test('moveY', () => {
		const c = new Circle(20, 30)
		const p = new Path(40, 50).lineTo(60, 70)

		const g = new Group() //
			.add(c) //
			.add(p) //
			.moveY(100) //

		expect(c.centerY).toEqual(130)
		expect(p.commands[0].y).toEqual(150)
		expect(p.commands[1].y).toEqual(170)
	})
})
