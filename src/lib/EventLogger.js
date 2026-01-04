import Cheddar from '$cheddar'

export default class EventLogger extends Cheddar.Group {
	__onsvg__pathcreated(e) {
		log('svg', 'pathcreated')
	}

	__onsvg__drawingpathlinestart(e) {
		log('svg', 'drawingpathlinestart')
	}

	__onsvg__drawingpathlinereset(e) {
		log('svg', 'drawingpathlinestart', e.detail.path.commands)
	}

	__onsvg__drawingpathlineend(e) {
		log('svg', 'drawingpathlineend', e.detail.path.commands)
	}
}

function log(type, event, ...messages) {
	console.log('[Glyph]', `${type}:${event}`, ...messages)
}
