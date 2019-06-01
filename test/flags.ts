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

let versions = sortObjectKeys(process.versions, {
	keys: ['node'],
});

log_dir(versions);

let version = versions.node.split('.').map(v => v.padStart(2, '0')).join('.');

outputJSON(join(__dirname, 'log', 'v' + version + '.json' ), {
	versions,
	support,
}, {
	spaces: 2
});

