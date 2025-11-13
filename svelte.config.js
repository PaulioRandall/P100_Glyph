import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			//$lib: path.resolve('./src/lib'),
		},
	},
}
