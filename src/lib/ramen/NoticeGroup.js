import BaseGroup from './BaseGroup.js'

// Extends BaseGroup by calling '__group__added' and
// '__group__removed' functions on elements added and
// removed from itself.
export default class NoticeGroup extends BaseGroup {
	add(element) {
		if (!element) {
			return false
		}

		super.add(element)

		if (typeof element.__group__added === 'function') {
			invokeNoticeFuncs(element, '__group__added')
		}

		return true
	}

	remove(element) {
		if (!element) {
			return false
		}

		super.remove(element)

		if (typeof element.__group__removed === 'function') {
			invokeNoticeFuncs(element, '__group__removed')
		}

		return true
	}
}

function invokeNoticeFuncs(obj, funcName) {
	const funcs = getNoticeFuncs(obj, funcName)

	//funcs.reverse()

	for (const f of funcs) {
		f.call(obj)
	}
}

function getNoticeFuncs(obj, funcName) {
	const funcs = []
	let proto = getProto(obj)

	// TODO: Currently runs the whole proto chain.
	//       Optimise so it only chains elements within
	//       this library.
	while (proto) {
		if (hasOwnFuncName(proto, funcName)) {
			funcs.push(proto[funcName])
		}

		proto = getProto(proto)
	}

	return funcs
}

function getProto(obj) {
	return Object.getPrototypeOf(obj)
}

function hasOwnFuncName(proto, funcName) {
	return Object.getOwnPropertyNames(proto).includes(funcName)
}
