import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$moonfire: path.resolve('./src/lib/P102'),
			$embed: path.resolve('./src/lib/P103'),
			$cheddar: path.resolve('./src/lib/P104'),
		},
	},
}
