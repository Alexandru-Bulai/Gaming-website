import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Utility function to copy index.html from src to public
const copyIndexToPublic = () => {
	const srcIndexPath = resolve(__dirname, 'src/index.html');
	const publicIndexPath = resolve(__dirname, 'public/index.html');
	fs.copyFileSync(srcIndexPath, publicIndexPath);
};

export default defineConfig({
	root: 'src',
	build: {
		outDir: '../public',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html')
			},
			// Add other Rollup options if necessary
		}
	},
	plugins: [{
		name: 'copy-index-html',
		buildStart: copyIndexToPublic
	}]
});
