/**
 * Created by user on 2020/5/23.
 */

import CrossSpawn from 'cross-spawn-extra';

import pkg from '../../package.json';
import { join } from 'path';

CrossSpawn.async('git', [
	'commit',
	'-m',
	`build: ${pkg.name}`,
	'--',
	'table.ts',
	'table.d.ts',
	'table.js',
	'wikipedia.ts',
	'wikipedia.d.ts',
	'wikipedia.js',

	'table_cn2tw.json',
	'table_tw2cn.json',

], {
	cwd: join(__dirname, '..', '..'),
	stdio: 'inherit',
})
