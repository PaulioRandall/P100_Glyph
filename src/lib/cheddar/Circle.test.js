import Circle from './Circle.js'

describe('Circle.js', () => {
	test('bbox', () => {
		const c = new Circle(10, 20, 30)

		expect(c.bbox.left).toEqual(-20)
		expect(c.bbox.top).toEqual(-10)
		expect(c.bbox.right).toEqual(40)
		expect(c.bbox.bottom).toEqual(50)
	})

	test('setCenterX', () => {
		const c = new Circle() //
			.setCenterX(10)

		expect(c.centerX).toEqual(10)
	})

	test('setCenterY', () => {
		const c = new Circle() //
			.setCenterY(10)

		expect(c.centerY).toEqual(10)
	})

	test('setRadius', () => {
		const c = new Circle() //
			.setRadius(10)

		expect(c.radius).toEqual(10)
	})
})
