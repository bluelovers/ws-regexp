/**
 * Created by user on 2020/5/27.
 */

import { crossSpawnGitAsync } from '@git-lazy/spawn';
import { join } from 'path';
import { _greedyTableCacheMap } from '../../lib/table';
import { outputJSON } from 'fs-extra';
import CrossSpawn from 'cross-spawn-extra';
import Bluebird from 'bluebird';

const __root = join(__dirname, '../..');

(async () =>
{
	const _cache_file = join(__root, 'test', 'cache', 'keys.json');

	await CrossSpawn.async('ts-node', [
			join(__root, 'lib', 'table.ts'),
		], {
			cwd: __root,
			stdio: 'inherit',
		})
		.then(e => Bluebird.delay(300))
	;

	// @ts-ignore
	let old: string[] = await import(_cache_file)
		.then(m => m.default || m)
		.catch(e => [] as string[])
	;

	let new_keys = [] as string[];
	let exists_keys = [] as string[];

	_greedyTableCacheMap
		.forEach((value, key) =>
		{

			if (!old.includes(key))
			{
				new_keys.push(key);
			}

			exists_keys.push(key);

		})
	;

	await crossSpawnGitAsync('git', [
		`add`,
		`./lib/table.ts`,
		`./lib/table.js`,
	], {
		cwd: __root,
		stdio: 'inherit',
	});

	await outputJSON(_cache_file, exists_keys, {
		spaces: 2,
	})

	await crossSpawnGitAsync('git', [
		`commit`,
		`-m`,
		`feat: zh-table-greedy ${exists_keys.join('|')}`,
		`--`,
		`./lib`,
		`./test/cache`,
	], {
		cwd: __root,
		stdio: 'inherit',
	});

})();

