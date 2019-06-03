/**
 * Created by user on 2018/4/26/026.
 */

import support from '..';
import { log_dir } from '../lib/util/index';
import { outputFile, outputJSON, copyFile, copy } from 'fs-extra';
import { inspect } from 'util';
import { join } from 'path';
import { sortObjectKeys } from 'sort-object-keys2';

log_dir(support);

let versions = sortObjectKeys(process.versions, {
	keys: ['node'],
});

log_dir(versions);

let version = versions.node.split('.').map(v => v.padStart(2, '0')).join('.');

let file = join(__dirname, 'log', 'v' + version + '.json' );

outputJSON(file, {
	versions,
	support,
}, {
	spaces: 2
})
	.then(async () => {

		let file2 = join(__dirname, '..', 'v' + version.split('.')[0] + '.json' );

		return copy(file, file2, {
			overwrite: true,
		})
	})
;

