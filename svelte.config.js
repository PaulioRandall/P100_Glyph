import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$moonfire: path.resolve('./src/lib/moonfire'),
			$ramen: path.resolve('./src/lib/ramen'),
			'$ramen-grid': path.resolve('./src/lib/ramen-grid'),
		},
	},
}
