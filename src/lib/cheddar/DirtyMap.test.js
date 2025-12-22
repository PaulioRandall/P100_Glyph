import DirtyMap from './DirtyMap.js'

function onUpdate(map) {
	const observer = { count: 0 }
	map.onUpdate(() => observer.count++)
	return observer
}

describe('DirtyMap.js', () => {
	test('put: new entry', () => {
		const m = new DirtyMap()

		m.put('a', 1)

		expect(m.has('a')).toEqual(true)
		expect(m.get('a')).toEqual(1)
		expect(m.listDirty()).toEqual(['a'])
	})

	test('put: same entry twice', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.clean()

		m.put('a', 1)
		expect(m.listDirty()).toEqual([])
	})

	test('put: calls update', () => {
		const m = new DirtyMap()
		const observer = onUpdate(m)

		expect(observer.count).toEqual(0)
		m.put('a', 1)
		expect(observer.count).toEqual(1)
		m.put('a', 1)
		expect(observer.count).toEqual(1)
		m.put('b', 2)
		expect(observer.count).toEqual(2)
	})

	test('putMissing: new missing', () => {
		const m = new DirtyMap()
		const observer = onUpdate(m)

		m.putMissing('a', 1)

		expect(m.has('a')).toEqual(true)
		expect(m.get('a')).toEqual(1)
		expect(m.listDirty()).toEqual(['a'])
		expect(observer.count).toEqual(1)
	})

	test('putMissing: already exists', () => {
		const m = new DirtyMap()

		m.put('a', undefined)
		m.putMissing('a', 123)

		expect(m.get('a')).toEqual(undefined)
	})

	test('val: gets', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.put('b', 2)

		expect(m.val('a')).toEqual(1)
		expect(m.val('b')).toEqual(2)
	})

	test('val: puts', () => {
		const m = new DirtyMap()

		m.val('a', 1)
		m.val('b', 2)

		expect(m.get('a')).toEqual(1)
		expect(m.get('b')).toEqual(2)
	})

	test('del', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.put('b', 2)

		m.del('a')

		expect(m.has('a')).toEqual(false)
		expect(m.get('a')).toEqual(undefined)
		expect(m.get('b')).toEqual(2)
	})

	test('del: calls update', () => {
		const m = new DirtyMap()
		m.put('a', 1)
		m.put('b', 2)

		const observer = onUpdate(m)

		expect(observer.count).toEqual(0)
		m.del('a')
		expect(observer.count).toEqual(1)
		m.del('a')
		expect(observer.count).toEqual(1)
	})
})
