import Two from 'two.js'
import Moonfire from '$moonfire'

// Extends BaseGroup by calling '__when__added_to_group' and
// '__when__removed_from_group' functions on elements added and
// removed from itself.
//
// Also adds useful array functionality such as clearing
// children etc.
export default class NoticeGroup extends Two.Group {
	clear() {
		const children = [...this.children]

		for (const child of children) {
			this.remove(child)
		}
	}

	add(element) {
		if (!element) {
			return false
		}

		super.add(element)
		Moonfire.invoke(element, '__when__added_to_group', true)

		return true
	}

	remove(element) {
		if (!element) {
			return false
		}

		super.remove(element)
		Moonfire.invoke(element, '__when__removed_from_group', true)

		return true
	}
}

function invokeNoticeFuncs(obj, funcName) {
	const funcs = getNoticeFuncs(obj, funcName)

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
