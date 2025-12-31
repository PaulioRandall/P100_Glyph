// Invoke the specified function.
//
// If capture is true, the object's protoype implementation
// is invoked first and the root extended implementation is
// called last. This mimics the behaviour of Event's
// capture-bubble API and mechanics.
export function invoke(obj, criteria, capture = false) {
	const funcs = match(obj, criteria)

	if (!capture) {
		funcs.reverse()
	}

	for (const { func, context } of funcs) {
		// Always calling with the original object as 'this'.
		func.call(context)
	}
}

// Find all own functions, from all prototypes of obj, that
// match the criteria. Criteria may be a string or regex.
export function match(obj, criteria) {
	return listPrototypes(obj) //
		.map((proto) => matchOwnFuncs(proto, criteria, obj)) //
		.flat() //
}

// Lists the prototype chain for a specified object.
export function listPrototypes(obj) {
	const result = []
	let proto = Object.getPrototypeOf(obj)

	while (proto) {
		result.push(proto)
		proto = Object.getPrototypeOf(proto)
	}

	return result
}

function matchOwnFuncs(proto, criteria, context) {
	const funcNames = matchOwnFuncNames(proto, criteria)

	return funcNames.map((name) => ({
		proto,
		name,
		func: proto[name],
		context,
	}))
}

function matchOwnFuncNames(proto, criteria) {
	const isFunction = (n) => typeof proto[n] === 'function'
	const names = Object.getOwnPropertyNames(proto)

	if (criteria.constructor === RegExp) {
		return names //
			.filter((n) => criteria.test(n)) //
			.filter(isFunction)
	}

	if (names.includes(criteria) && isFunction(criteria)) {
		return [criteria]
	}

	return []
}

export default {
	listPrototypes,
	match,
	invoke,
}
