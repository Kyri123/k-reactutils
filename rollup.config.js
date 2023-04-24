import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: './lib/index.js',
			format: 'cjs',
		},
		{
			file: './esm/index.js',
			format: 'es',
		},
	],
	external: [ ...Object.keys( pkg.dependencies || {} ), ...Object.keys( pkg.devDependencies || {} ) ],
	plugins: [
		commonjs(),
		typescript(),
	],
};
