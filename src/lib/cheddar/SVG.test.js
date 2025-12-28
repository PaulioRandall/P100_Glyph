import SVG from './SVG.js'
import Circle from './Circle.js'

describe('SVG.js', () => {
	test('add/remove: causes update', () => {
		const svg = new SVG()
		const shape = new Circle(10, 10, 10)

		let count = 0
		svg.onUpdate(() => count++)

		svg.add(shape)
		expect(count).toEqual(1)

		svg.remove(shape)
		expect(count).toEqual(2)
	})

	test('viewbox: changes cause update', () => {
		const svg = new SVG()

		let count = 0
		svg.onUpdate(() => count++)

		svg.viewbox.setLeft(-100)
		svg.viewbox.setWidth(500)
		svg.viewbox.moveBy(0, 200)
		expect(count).toEqual(3)
	})
})
