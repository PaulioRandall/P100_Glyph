import Circle from './Circle.js'

describe('Circle.js', () => {
	test('setCX', () => {
		const c = new Circle() //
			.setCX(10)

		expect(c.cx).toEqual(10)
	})

	test('setCY', () => {
		const c = new Circle() //
			.setCY(10)

		expect(c.cy).toEqual(10)
	})

	test('setR/setRadius', () => {
		const c = new Circle() //
			.setR(10)

		expect(c.r).toEqual(10)
	})
})
