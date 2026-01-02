export const NAME_SPACE = 'http://www.w3.org/2000/svg'

export function randomId() {
	return crypto.randomUUID().slice(24)
}

export function boundsOfCoords(iterable) {
	const bounds = {
		left: null,
		top: null,
		right: null,
		bottom: null,
	}

	for (const item of iterable) {
		if (item.x === null || item.y === null) {
			continue
		}

		if (bounds.left === null || bounds.left > item.x) {
			bounds.left = item.x
		}

		if (bounds.right === null || bounds.right < item.x) {
			bounds.right = item.x
		}

		if (bounds.top === null || bounds.top > item.y) {
			bounds.top = item.y
		}

		if (bounds.bottom === null || bounds.bottom < item.y) {
			bounds.bottom = item.y
		}
	}

	return bounds
}

export default {
	NAME_SPACE,
	randomId,
}
