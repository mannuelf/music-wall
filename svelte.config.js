import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: vitePreprocess({
		postcss: true
	}),
	vitePlugin: {
		inspector: true
	},
	kit: {
		alias: {
			$lib: 'src/lib/'
		},
		adapter: adapter()
	}
};

export default config;
