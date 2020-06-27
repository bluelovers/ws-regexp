/**
 * Created by user on 2020/5/27.
 */

import { crossSpawnGitAsync } from '@git-lazy/spawn';
import { join } from 'path';
import { outputJSON } from 'fs-extra';
import { tryBuild } from './util';

const __root = join(__dirname, '../..');

(async () =>
{
	const _cache_file = join(__root, 'test', 'cache', 'keys.json');

	await tryBuild();
	//await tryBuild(true);

	// @ts-ignore
	let old: string[] = await import(_cache_file)
		.then(m => m.default || m)
		.catch(e => [] as string[])
	;

	let new_keys = [] as string[];
	let exists_keys = [] as string[];

	const { _greedyTableCacheMap } = await import('../../lib/table');

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

	let msg = new_keys.join('|');

	console.dir(msg);

	if (1)
	{
		await outputJSON(_cache_file, exists_keys, {
			spaces: 2,
		})
	}

	await crossSpawnGitAsync('git', [
		`add`,
		`./lib/table.ts`,
		`./lib/table.js`,
		`./test`,
	], {
		cwd: __root,
		stdio: 'inherit',
	});

	if (1)
	{
		await crossSpawnGitAsync('git', [
			`commit`,
			`-m`,
			`feat(zh-table-greedy): zh-table-greedy ${msg}`,
			`--`,
			`./lib`,
			`./test`,
		], {
			cwd: __root,
			stdio: 'inherit',
			throwError: false,
		});
	}

})();
