import Embed from './Embed.js'

class A {
	_a = 'alpha'

	get a() {
		return a
	}

	set a(v) {
		this._a = v
	}

	getA() {
		return this._a
	}

	setA(v) {
		this._a = v
	}
}

class B {
	// TODO
}

describe('Embed.js', () => {
	test('Adds getters', () => {
		class AddsGetters extends Embed([A]) {}
		const instance = new AddsGetters()

		console.log(instance)
		expect(instance.a).toEqual('alpha')
	})
})
