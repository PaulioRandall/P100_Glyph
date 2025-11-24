export default class Store {
	_store = {}

	has(key) {
		return Object.hasOwn(this._store, key)
	}

	get(key) {
		return this._store[key]
	}

	put(key, value) {
		this._store[key] = value
	}

	del(key) {
		const v = this._store[key]
		delete this._store[key]
		return v
	}
}
