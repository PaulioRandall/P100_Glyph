import Circle from './Circle.js'

describe('Circle.js', () => {
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
