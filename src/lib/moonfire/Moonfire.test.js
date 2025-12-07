import moonfire from './Moonfire.js'

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
	test('moonfire(): 1', () => {
		// GIVEN a function with own implementations on the
		//       class and all its subclasses
		// WHEN  invoking Moonfire with default capture
		//       argument (false)
		// THEN  all implementations are called with the
		//       root extended class's implementation called
		//       first and the passed class's implementation
		//       called last

		const [called, mock] = constructMock()
		moonfire(mock, 'doStuff')

		expect(called).toEqual([
			'Alpha.doStuff', //
			'Beta.doStuff', //
			'Charlie.doStuff', //
		])
	})

	test('moonfire(): 2', () => {
		// GIVEN a function with own implementations on the
		//       class and all its subclasses
		// WHEN  invoking Moonfire with capture argument as
		//       true
		// THEN  all implementations are called with the
		//       the passed class's implementation called
		//       first and the root extended class's
		//       implementation called last

		const [called, mock] = constructMock()
		moonfire(mock, 'doStuff', true)

		expect(called).toEqual([
			'Charlie.doStuff', //
			'Beta.doStuff', //
			'Alpha.doStuff', //
		])
	})

	test('moonfire(): 3', () => {
		// GIVEN a function with own implementations on the
		//       class and SOME of its subclasses
		// WHEN  invoking Moonfire with default capture
		//       argument
		// THEN  all implementations are called

		const [called, mock] = constructMock()
		moonfire(mock, 'doThing')

		expect(called).toEqual([
			'Alpha.doThing', //
			'Charlie.doThing', //
		])
	})
})
