/**
 * Created by user on 2020/5/27.
 */

import { crossSpawnGitAsync } from '@git-lazy/spawn';
import { join } from 'path';
import { outputJSON } from 'fs-extra';
import { getCachedKeys } from './util';

const __root = join(__dirname, '../..');

(async () =>
{
	const _cache_file = join(__root, 'test', 'cache', 'keys.json');

	let _init: boolean;

	// @ts-ignore
	let old: {
			table_jp: string[],
			table_plus: string[],
		} = await import(_cache_file)
		.then(m => m.default || m)
		.catch(e => {
			_init = true;

			return {
				table_jp: [] as string[],
				table_plus: [] as string[],
			}
		})
	;

	let new_keys = {
		table_jp: [] as string[],
		table_plus: [] as string[],
	};

	const { table_jp, table_plus } = await import('../../lib/table');

	if (!_init)
	{
		Object.entries(table_jp)
			.forEach(([key, value]) =>
			{

				if (!old.table_jp.includes(key))
				{
					new_keys.table_jp.push(key);
				}
			})
		;

		Object.entries(table_plus)
			.forEach(([key, value]) =>
			{

				if (!old.table_plus.includes(key))
				{
					new_keys.table_plus.push(key);
				}
			})
		;
	}

	let msg = [
		`table_jp:`,
		new_keys.table_jp.join('|'),
		',',
		`table_plus`,
		new_keys.table_plus.join('|'),
	].join(' ');

	console.dir(msg);

	if (1)
	{
		await outputJSON(_cache_file, getCachedKeys({
			table_jp,
			table_plus,
		}), {
			spaces: 2,
		})
	}

	await crossSpawnGitAsync('git', [
		`add`,
		`./lib`,
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
			`build(zh-table-alias): zh-table-alias ${msg}`,
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
