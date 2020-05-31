/**
 * Created by user on 2020/6/1.
 */

import yaml from 'js-yaml';
import fs, { readFile, outputJSON } from 'fs-extra';
import FastGlob from '@bluelovers/fast-glob/bluebird';
import { join, parse } from 'path';

const __root = join(__dirname, '..', '..');

const __raw = join(__root, 'lib/table/raw');

FastGlob.async([
	'**/*.yml',
], {
	cwd: join(__raw, 'yml'),
})
.each(file => {

	let p = parse(file);

	let jf = join(__raw, 'json', p.dir, p.name + '.json');

	return readFile(join(__raw, 'yml', file))
		.then(buf => yaml.load(buf.toString()))
		.then(yml => outputJSON(jf, yml, {
			spaces: 2,
		}))
	;
})
