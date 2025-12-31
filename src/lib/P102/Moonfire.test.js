import Moonfire from './Moonfire.js'

class Alpha {
	_logCall = null // () => {}

	constructor(logCall) {
		this._logCall = logCall
	}

	doThing() {
		return this._logCall('Alpha.doThing')
	}

	doStuff() {
		return this._logCall('Alpha.doStuff')
	}
}

class Beta extends Alpha {
	doStuff() {
		return this._logCall('Beta.doStuff')
	}
}

class Charlie extends Beta {
	doThing() {
		return this._logCall('Charlie.doThing')
	}

	doStuff() {
		return this._logCall('Charlie.doStuff')
	}
}

function constructMock() {
	const called = []
	const logCall = (id) => called.push(id)
	const mock = new Charlie(logCall)
	return [called, mock]
}

describe('moonfire.js', () => {
	test('Moonfire.invoke(): 1', () => {
		const [called, mock] = constructMock()
		Moonfire.invoke(mock, 'doStuff')

		expect(called).toEqual([
			'Alpha.doStuff', //
			'Beta.doStuff', //
			'Charlie.doStuff', //
		])
	})

	test('Moonfire.invoke(): 2', () => {
		const [called, mock] = constructMock()
		Moonfire.invoke(mock, 'doStuff', true)

		expect(called).toEqual([
			'Charlie.doStuff', //
			'Beta.doStuff', //
			'Alpha.doStuff', //
		])
	})

	test('Moonfire.invoke(): 3', () => {
		const [called, mock] = constructMock()
		Moonfire.invoke(mock, 'doThing')

		expect(called).toEqual([
			'Alpha.doThing', //
			'Charlie.doThing', //
		])
	})

	test('Moonfire.invoke(): 4', () => {
		const [called, mock] = constructMock()
		Moonfire.invoke(mock, /do[A-Z][a-z]+/)

		expect(called).toEqual([
			'Alpha.doStuff', //
			'Alpha.doThing', //
			'Beta.doStuff', //
			'Charlie.doStuff', //
			'Charlie.doThing', //
		])
	})
})
