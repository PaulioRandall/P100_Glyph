import Bounds from './Bounds.js'

describe('Bounds.js', () => {
	test('width() set properly', () => {
		const cb = new Bounds()

		cb.setLeft(-100)
		cb.setRight(+100)

		expect(cb.width).toEqual(200)
	})

	test('height() set properly', () => {
		const cb = new Bounds()

		cb.setTop(-100)
		cb.setBottom(+100)

		expect(cb.height).toEqual(200)
	})

	test('centerX()', () => {
		const cb = new Bounds()

		cb.setLeft(25)
		cb.setRight(125)
		expect(cb.centerX).toEqual(75)
	})

	test('centerY()', () => {
		const cb = new Bounds()

		cb.setTop(25)
		cb.setBottom(125)
		expect(cb.centerY).toEqual(75)
	})

	test('contains()', () => {
		const cb = new Bounds()
		cb.set(0, 0, 100, 100)

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
		const cb = new Bounds()
		cb.set(0, 0, 100, 100)

		const f = (x, y) => cb.containsWithin(x, y)

		expect(f(-1, 50)).toEqual(false)
		expect(f(50, -1)).toEqual(false)
		expect(f(0, 0)).toEqual(false)
		expect(f(50, 50)).toEqual(true)
		expect(f(100, 100)).toEqual(false)
		expect(f(101, 50)).toEqual(false)
		expect(f(50, 101)).toEqual(false)
	})
})
