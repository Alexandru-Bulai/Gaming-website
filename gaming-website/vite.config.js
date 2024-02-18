import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	root: 'src',
	build: {
		outDir: '../public',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
			},
			// Add other Rollup options if necessary
		},
	},
	// ... other configurations
});
