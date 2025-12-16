import List from './List.js'

const A = 'A'
const B = 'B'
const C = 'C'
const D = 'D'

describe('List.js', () => {
	test('static from()', () => {
		const list = List.from([A, B, C])
		expect(list).toEqual([A, B, C])
	})

	test('withinRange() with length excluded', () => {
		const list = List.from([A, B, C])
		const f = (i) => list.withinRange(i)

		expect(f(-1)).toEqual(false)
		expect(f(0)).toEqual(true)
		expect(f(1)).toEqual(true)
		expect(f(2)).toEqual(true)
		expect(f(3)).toEqual(false)
	})

	test('withinRange() with length included', () => {
		const list = List.from([A, B, C])
		const f = (i) => list.withinRange(i, true)

		expect(f(-1)).toEqual(false)
		expect(f(0)).toEqual(true)
		expect(f(1)).toEqual(true)
		expect(f(2)).toEqual(true)
		expect(f(3)).toEqual(true)
		expect(f(4)).toEqual(false)
	})

	test('beforeLast() returns null for list with 1 item', () => {
		const list = List.from([A])
		expect(list.beforeLast()).toEqual(null)
	})

	test('beforeLast() returns correct item', () => {
		const list = List.from([A, B, C])
		expect(list.beforeLast()).toEqual(B)
	})

	test('last() returns null for empty list', () => {
		const list = List.from([])
		expect(list.last()).toEqual(null)
	})

	test('last() returns correct item', () => {
		const list = List.from([A, B, C])
		expect(list.last()).toEqual(C)
	})

	test('itemBefore()', () => {
		const list = List.from([A, B, C])
		expect(list.itemBefore(A)).toEqual(null)
		expect(list.itemBefore(B)).toEqual(A)
		expect(list.itemBefore(C)).toEqual(B)
		expect(list.itemBefore(D)).toEqual(null)
	})

	test('itemAfter()', () => {
		const list = List.from([A, B, C])
		expect(list.itemAfter(A)).toEqual(B)
		expect(list.itemAfter(B)).toEqual(C)
		expect(list.itemAfter(C)).toEqual(null)
		expect(list.itemAfter(D)).toEqual(null)
	})

	test('insert() puts item in correct place', () => {
		const list = List.from([A, C])
		list.insert(1, B)
		expect(list).toEqual([A, B, C])
	})

	test('insert() puts item at end of list', () => {
		const list = List.from([A, B])
		list.insert(2, C)
		expect(list).toEqual([A, B, C])
	})

	test('insert() throws if index is out of bounds', () => {
		const list = List.from([A, C])
		const f = () => list.insert(5, B)
		expect(f).toThrow(Error)
	})

	test('insertBefore() puts item in correct place', () => {
		const list = List.from([A, C])
		list.insertBefore(C, B)
		expect(list).toEqual([A, B, C])
	})

	test('insertBefore() throws if ref item not in list', () => {
		const list = List.from([A, C])
		const f = () => list.insertBefore(D, B)
		expect(f).toThrow(Error)
	})

	test('insertAfter() puts item in correct place', () => {
		const list = List.from([A, C])
		list.insertAfter(A, B)
		expect(list).toEqual([A, B, C])
	})

	test('insertAfter() throws if ref item not in list', () => {
		const list = List.from([A, C])
		const f = () => list.insertAfter(D, B)
		expect(f).toThrow(Error)
	})

	test('replace() swaps correct items', () => {
		const list = List.from([A, B, C])
		list.replace(C, D)
		expect(list).toEqual([A, B, D])
	})

	test('replace() throws if current item is not in list', () => {
		const list = List.from([A, B])
		const f = () => list.replace(D, C)
		expect(f).toThrow(Error)
	})

	test('remove() remove correct item', () => {
		const list = List.from([A, B, C])
		list.remove(B)
		expect(list).toEqual([A, C])
	})

	test('remove() remove nothing when item not in list', () => {
		const list = List.from([A, B, C])
		list.remove(D)
		expect(list).toEqual([A, B, C])
	})

	test('clear() removes all items', () => {
		const list = List.from([A, B, C])
		list.clear()
		expect(list).toEqual([])
	})

	test('callAll() calls all functions', () => {
		const called = []
		const calledWith = []

		const fA = (...args) => {
			called.push(A)
			calledWith.push(args)
		}

		const fB = (...args) => {
			called.push(B)
			calledWith.push(args)
		}

		const list = List.from([fA, C, fB, D])
		list.callAll('rum', 'whiskey')

		expect(called).toEqual([A, B])
		expect(calledWith).toEqual([
			['rum', 'whiskey'],
			['rum', 'whiskey'],
		])
	})
})
