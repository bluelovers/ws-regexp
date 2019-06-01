/**
 * Created by user on 2018/4/26/026.
 */

import support from '..';
import { log_dir } from '../lib/util/index';
import { outputFile, outputJSON } from 'fs-extra';
import { inspect } from 'util';
import { join } from 'path';
import { sortObjectKeys } from 'sort-object-keys2';

log_dir(support);

log_dir(process.versions);

let version = process.versions.node.split('.').map(v => v.padStart(2, '0')).join('.');

outputJSON(join(__dirname, 'log', 'v' + version + '.json' ), {
	versions: sortObjectKeys(process.versions, {
		keys: ['node'],
	}),
	support,
}, {
	spaces: 2
});

