// TODO: Add function to returns all functions that match
//       a regex with out invoking them; this includes
//       those with the same name in the protoype chain if
//       polymorphic is false.

// Invoke the specified function.
//
// If capture is true, the object's protoype implementation
// is invoked first and thee root extended implementation is
// called last. This mimics the behaviour of Event's
// capture-bubble API and mechanics.
export default function (obj, funcName, capture = false) {
	const funcs = listFuncs(obj, funcName, !!capture)

	for (const f of funcs) {
		// Always calling with the original object as 'this'.
		f.call(obj)
	}
}

// Returns every own instance of the function from the
// prototype chain as an array. If capture is false then the
// array is returned reversed.
function listFuncs(obj, funcName, capture) {
	const funcs = listPrototypes(obj) //
		.filter((proto) => Object.hasOwn(proto, funcName)) //
		.map((proto) => proto[funcName])
	return capture ? funcs : funcs.reverse()
}

/*
// Same as getFuncChain except it accepts a funcName regex
// for matching.
function getFuncChainRegex(obj, regex, capture) {
	const funcs = listPrototypes(obj) //
		.filter((proto) => Object.hasOwn(proto, funcName)) //
		.map((proto) => proto[funcName])
	return capture ? funcs : funcs.reverse()
}
*/

// Lists the prototype chain for a specified object.
function listPrototypes(obj) {
	const result = []
	let proto = Object.getPrototypeOf(obj)

	while (proto) {
		result.push(proto)
		proto = Object.getPrototypeOf(proto)
	}

	return result
}
