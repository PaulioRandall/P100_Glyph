export const NAME_SPACE = 'http://www.w3.org/2000/svg'

export function randomId() {
	return crypto.randomUUID().slice(24)
}

export default {
	NAME_SPACE,
	randomId,
}
