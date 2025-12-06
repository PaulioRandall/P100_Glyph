// TODO: Add function to returns all functions that match
//       a regex with out invoking them; this includes
//       those with the same name in the protoype chain if
//       polymorphic is false,

// Moonfire invokes functions on an object and its
// prototype chain, depending on the options provided.
export default class Moonfire {
	static invoke(obj, funcName, options = null) {
		invoke(obj, funcName, options)
	}

	_obj = null
	_options = null

	constructor(obj, options = null) {
		this._obj = obj
		this._options = options
	}

	invoke(funcName, options = null) {
		options = mergeOptions(this._options, options)
		invoke(obj, funcName, options)
	}
}

// Merge a set of object such that a latter object
// overrides properties set by a former object.
function mergeOptions(...optionSets) {
	const mergedOptions = {}

	for (const options of optionSets) {
		const propNames = Object.getOwnPropertyNames(options)

		for (const propName of propNames) {
			mergedOptions[propName] = options[propName]
		}
	}

	return mergedOptions
}

// Invoke the specified function.
//
// If polymorphic option is true then the function is
// called on the object as if it where called in normal
// code. If false, all functions of that name are
// invoked in the prototype chain of the object.
//
// Capture option only applies when polymorphic option is
// false. If true, the object's protoype implementation
// is invoked first. If false invocations start at the root
// level prototype and propagate back up to the object.
// This mimics the behaviour of event capture-propagation
// bubbling.
function invoke(obj, funcName, options = null) {
	const polymorphic = getBoolOption(options, 'polymorphic', true)
	const capture = getBoolOption(options, 'capture', true)
	const funcs = listFuncs(obj, funcName, polymorphic, capture)

	for (const f of funcs) {
		// Always calling with the original object as 'this'.
		f.call(obj)
	}
}

// Returns a boolean option from the user options. The
// default value is returned if the options object is falsy
// or the option doesn't exist; but if the option exists
// and not a bool then an error is thrown.
function getBoolOption(options, name, defaultValue) {
	if (!options || isNotDefined(options[name])) {
		return defaultValue
	}

	if (typeof options[name] !== 'boolean') {
		throw new Error(`'options.${name}' must be boolean`)
	}

	return options[name]
}

// Returns true if value is undefined, null, or NaN.
function isNotDefined(value) {
	return value === undefined || value === null || isNaN(value)
}

// Returns an array of functions to be invoked.
function listFuncs(obj, funcName, polymorphic, capture) {
	if (polymorphic) {
		return getFunc(obj, funcName)
	}
	return getFuncChain(obj, funcName, capture)
}

// Returns an array containing only the specified function
// if it exists, else returns an empty array. Doesn't
// matter if the function is an own property or inherited.
function getFunc(obj, funcName) {
	return obj[funcName] ? [obj[funcName]] : []
}

// Returns every own instance of the function from the
// prototype chain as an array. If capture is false
// (i.e. propagation) then the array is returned reversed.
function getFuncChain(obj, funcName, capture) {
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
