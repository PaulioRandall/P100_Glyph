import Cheddar from '$cheddar'
import EventUtil from './EventUtil.js'

export default class PathDrawer extends Cheddar.Group {
	_path = null

	__onsvg__mousedown(e) {
		if (!this._path) {
			this._begin()
		} else if (EventUtil.isLeftButton(e)) {
			console.log(e.clientX, e.clientY)
		}
	}

	_begin() {
		this._path = Cheddar.path()
	}
}
