import BBox from './BBox.js'

describe('BBox.js', () => {
	test('width()', () => {
		const cb = new BBox() //
			.setLeft(-100) //
			.setRight(+100) //

		expect(cb.width).toEqual(200)
	})

	test('height()', () => {
		const cb = new BBox() //
			.setTop(-100) //
			.setBottom(+100) //

		expect(cb.height).toEqual(200)
	})

	test('centerX()', () => {
		const cb = new BBox() //
			.setLeft(-25) //
			.setRight(125) //

		expect(cb.centerX).toEqual(50)
	})

	test('centerY()', () => {
		const cb = new BBox() //
			.setTop(-25) //
			.setBottom(125) //

		expect(cb.centerY).toEqual(50)
	})

	test('setCenterX()', () => {
		const cb = new BBox() //
			.setEdges(0, 0, 100, 100) //
			.setCenterX(25)

		expect(cb.centerX).toEqual(25)
		expect(cb.left).toEqual(-25)
		expect(cb.right).toEqual(75)
	})

	test('setCenterY()', () => {
		const cb = new BBox() //
			.setEdges(0, 0, 100, 100) //
			.setCenterY(25)

		expect(cb.centerY).toEqual(25)
		expect(cb.top).toEqual(-25)
		expect(cb.bottom).toEqual(75)
	})

	test('setCenter()', () => {
		const cb = new BBox() //
			.setEdges(0, 0, 100, 100) //
			.setCenter(25, 25)

		expect(cb.centerX).toEqual(25)
		expect(cb.centerY).toEqual(25)

		expect(cb.left).toEqual(-25)
		expect(cb.right).toEqual(75)

		expect(cb.top).toEqual(-25)
		expect(cb.bottom).toEqual(75)
	})

	test('setWidthAnchorLeft()', () => {
		const cb = new BBox() //
			.setLeft(-25) //
			.setWidthAnchorLeft(100) //

		expect(cb.width).toEqual(100)
		expect(cb.right).toEqual(75)
		expect(cb.centerX).toEqual(25)
	})

	test('setWidthAnchorCenter()', () => {
		const cb = new BBox() //
			.setLeft(0) //
			.setRight(100) //
			.setWidthAnchorCenter(200) //

		expect(cb.left).toEqual(-50)
		expect(cb.right).toEqual(150)
	})

	test('setWidthAnchorRight()', () => {
		const cb = new BBox() //
			.setRight(25) //
			.setWidthAnchorRight(100) //

		expect(cb.width).toEqual(100)
		expect(cb.left).toEqual(-75)
		expect(cb.centerX).toEqual(-25)
	})

	test('setHeightAnchorTop()', () => {
		const cb = new BBox() //
			.setTop(-25) //
			.setHeightAnchorTop(100) //

		expect(cb.height).toEqual(100)
		expect(cb.bottom).toEqual(75)
		expect(cb.centerY).toEqual(25)
	})

	test('setHeightAnchorCenter()', () => {
		const cb = new BBox() //
			.setTop(0) //
			.setBottom(100) //
			.setHeightAnchorCenter(200) //

		expect(cb.top).toEqual(-50)
		expect(cb.bottom).toEqual(150)
	})

	test('setHeightAnchorBottom()', () => {
		const cb = new BBox() //
			.setBottom(25) //
			.setHeightAnchorBottom(100) //

		expect(cb.height).toEqual(100)
		expect(cb.top).toEqual(-75)
		expect(cb.centerY).toEqual(-25)
	})

	test('moveBy()', () => {
		const cb = new BBox() //
			.setEdges(0, 0, 100, 100) //
			.moveBy(25, 25) //
			.moveBy(-50, -50) //

		expect(cb.left).toEqual(-25)
		expect(cb.top).toEqual(-25)

		expect(cb.right).toEqual(75)
		expect(cb.bottom).toEqual(75)

		expect(cb.centerX).toEqual(25)
		expect(cb.centerY).toEqual(25)
	})

	test('contains()', () => {
		const cb = new BBox() //
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
		const cb = new BBox() //
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
		const cb = new BBox() //
			.setEdges(-25, -25, 75, 75) //

		expect(cb.toString()).toEqual('-25 -25 75 75')
	})

	test('toViewboxString()', () => {
		const cb = new BBox() //
			.setEdges(-25, -25, 75, 75) //

		expect(cb.toViewboxString()).toEqual('-25 -25 100 100')
	})
})
