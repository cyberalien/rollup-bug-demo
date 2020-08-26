import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/test.js',
		format: 'iife',
		name: 'test',
	},
	plugins: [
		resolve({
			browser: true,
		}),
		commonjs(),
		buble(),
	],
};
