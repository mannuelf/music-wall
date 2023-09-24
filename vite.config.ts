import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	build: {
		commonjsOptions: {
			include: ['node_modules']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
