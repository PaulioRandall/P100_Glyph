import Updateable from './Updateable.js'

describe('Updateable.js', () => {
	test('No listeners', () => {
		const cu = new Updateable()
		cu.notify()
	})

	test('Try to add listener that is not a function', () => {
		const cu = new Updateable()

		const f = () => cu.onUpdate('not a function')

		expect(f).toThrow(Error)
	})

	test('Listeners notified in order of entry', () => {
		const cu = new Updateable()
		const called = []

		cu.onUpdate(() => called.push(1))
		cu.onUpdate(() => called.push(2))
		cu.onUpdate(() => called.push(3))

		cu.notify()

		expect(called).toEqual([1, 2, 3])
	})

	test('Listener removed', () => {
		const cu = new Updateable()
		const called = []

		const one = () => called.push(1)
		const two = () => called.push(2)
		const three = () => called.push(3)

		cu.onUpdate(one)
		cu.onUpdate(two)
		cu.onUpdate(three)

		cu.offUpdate(two)

		cu.notify()

		expect(called).toEqual([1, 3])
	})
})
