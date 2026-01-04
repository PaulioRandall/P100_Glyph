import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$arrayutil: path.resolve('./src/lib/P101'),
			$moonfire: path.resolve('./src/lib/P102'),
			$embed: path.resolve('./src/lib/P103'),
			$cheddar: path.resolve('./src/lib/P104'),
		},
	},
}
