import Bounds from './Bounds.js'

describe('Bounds.js', () => {
	test('width() set properly', () => {
		const cb = new Bounds() //
			.setLeft(-100) //
			.setRight(+100) //

		expect(cb.width).toEqual(200)
	})

	test('height() set properly', () => {
		const cb = new Bounds() //
			.setTop(-100) //
			.setBottom(+100) //

		expect(cb.height).toEqual(200)
	})

	test('centerX()', () => {
		const cb = new Bounds() //
			.setLeft(-25) //
			.setRight(125) //

		expect(cb.centerX).toEqual(50)
	})

	test('centerY()', () => {
		const cb = new Bounds() //
			.setTop(-25) //
			.setBottom(125) //

		expect(cb.centerY).toEqual(50)
	})

	test('setCenterX()', () => {
		const cb = new Bounds() //
			.setEdges(0, 0, 100, 100) //
			.setCenterX(25)

		expect(cb.centerX).toEqual(25)
		expect(cb.left).toEqual(-25)
		expect(cb.right).toEqual(75)
	})

	test('setCenterY()', () => {
		const cb = new Bounds() //
			.setEdges(0, 0, 100, 100) //
			.setCenterY(25)

		expect(cb.centerY).toEqual(25)
		expect(cb.top).toEqual(-25)
		expect(cb.bottom).toEqual(75)
	})

	test('setWidth()', () => {
		const cb = new Bounds() //
			.setLeft(0) //
			.setRight(100) //
			.setWidth(200) //

		expect(cb.left).toEqual(-50)
		expect(cb.right).toEqual(150)
	})

	test('setHeight()', () => {
		const cb = new Bounds() //
			.setTop(0) //
			.setBottom(100) //
			.setHeight(200) //

		expect(cb.top).toEqual(-50)
		expect(cb.bottom).toEqual(150)
	})

	test('setWidthFromLeft()', () => {
		const cb = new Bounds() //
			.setLeft(-25) //
			.setWidthFromLeft(75) //

		expect(cb.width).toEqual(75)
		expect(cb.right).toEqual(50)
	})

	test('setWidthFromRight()', () => {
		const cb = new Bounds() //
			.setRight(25) //
			.setWidthFromRight(75) //

		expect(cb.width).toEqual(75)
		expect(cb.left).toEqual(-50)
	})

	test('setHeightFromTop()', () => {
		const cb = new Bounds() //
			.setTop(-25) //
			.setHeightFromTop(75) //

		expect(cb.height).toEqual(75)
		expect(cb.bottom).toEqual(50)
	})

	test('setHeightFromBottom()', () => {
		const cb = new Bounds() //
			.setBottom(25) //
			.setHeightFromBottom(75) //

		expect(cb.height).toEqual(75)
		expect(cb.top).toEqual(-50)
	})

	test('contains()', () => {
		const cb = new Bounds() //
			.setEdges(0, 0, 100, 100) //

		const f = (x, y) => cb.contains(x, y)

		expect(f(-1, 50)).toEqual(false)
		expect(f(50, -1)).toEqual(false)
		expect(f(0, 0)).toEqual(true)
		expect(f(50, 50)).toEqual(true)
		expect(f(100, 100)).toEqual(true)
		expect(f(101, 50)).toEqual(false)
		expect(f(50, 101)).toEqual(false)
	})

	test('containsWithin()', () => {
		const cb = new Bounds() //
			.setEdges(0, 0, 100, 100) //

		const f = (x, y) => cb.containsWithin(x, y)

		expect(f(-1, 50)).toEqual(false)
		expect(f(50, -1)).toEqual(false)
		expect(f(0, 0)).toEqual(false)
		expect(f(50, 50)).toEqual(true)
		expect(f(100, 100)).toEqual(false)
		expect(f(101, 50)).toEqual(false)
		expect(f(50, 101)).toEqual(false)
	})

	test('toString()', () => {
		const cb = new Bounds() //
			.setEdges(-25, -25, 75, 75) //

		expect(cb.toString()).toEqual('-25 -25 75 75')
	})

	test('toViewboxString()', () => {
		const cb = new Bounds() //
			.setEdges(-25, -25, 75, 75) //

		expect(cb.toViewboxString()).toEqual('-25 -25 100 100')
	})
})
