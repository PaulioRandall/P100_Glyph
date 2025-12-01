import { GridCanvas } from '$ramen'

export default class GlyphCanvas extends GridCanvas {
	static MODE_DRAW = 'draw'
	static MODE_SELECT = 'select'
	static MODES = [GlyphCanvas.MODE_DRAW, GlyphCanvas.MODE_SELECT]

	_mode = $state(GlyphCanvas.MODE_DRAW)

	// TODO: Move element loading to here.
	//       So state can be better managed.

	get mode() {
		return this._mode
	}

	_changeMode(newMode) {
		if (!GlyphCanvas.MODES.includes(newMode)) {
			throw new Error(`Unknown mode '${newMode}'`)
		}

		this._mode = newMode
	}

	enterDrawMode() {
		this._changeMode(GlyphCanvas.MODE_DRAW)

		// TODO
	}

	enterSelectMode() {
		this._changeMode(GlyphCanvas.MODE_SELECT)

		// TODO
	}

	/*

	$effect(() => {
		if (!pathDrawer) {
			return
		}

		if (mode === 'draw') {
			canvas.add(pathDrawer)
			canvas.store.set('pathDrawer', pathDrawer)			
		} else {
			canvas.store.delete('pathDrawer')
			canvas.remove(pathDrawer)
		}
	})
*/
}
