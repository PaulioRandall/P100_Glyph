import Cheddar from '$cheddar'

export default class Diagram extends Cheddar.Group {
	_shapes = []

	get shapes() {
		return [...this._shapes]
	}

	__onsvg__newpath(e) {
		const path = e.detail.path
		this._shapes.push(path)
		this.add(path)
	}
}
