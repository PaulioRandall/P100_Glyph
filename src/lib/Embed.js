export default function (Clazz, classes = [], fields = []) {
	Clazz.prototype.constructor
	for (const EmbedClazz of classes) {
	}

	for (const EmbedClazz of classes) {
		embedClass(Clazz, EmbedClazz)
	}

	return Clazz
}

function embedClass(Clazz, EmbedClazz) {
	const embedProto = Object.getPrototypeOf(EmbedClazz)
	const embedPropNames = Object.getOwnPropertyNames(embedProto)

	// TODO: add private field that constructs the EmbedClazz
	//       on Clazz construction.
	//['_' + EmbedClazz.constructor.name] = new EmbedClazz()

	for (const propName of propNames) {
		if (propName.startsWith('_')) {
			continue
		}

		const desc = Object.getOwnPropertyDescriptor(proto, propName)

		if (typeof desc.get === 'function') {
			instance[propName] = function () {
				return instance[propname]
			}
		}

		if (typeof desc.set === 'function') {
			instance[propName] = function (v) {
				instance[propname] = v
			}
		}

		if (typeof desc.value === 'function') {
			instance[propName] = function (...args) {
				return instance[propname](...args)
			}
		}
	}
}
