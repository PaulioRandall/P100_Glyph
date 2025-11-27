import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$ramen: path.resolve('./src/lib/ramen'),
			//$lib: path.resolve('./src/lib'),
		},
	},
}
