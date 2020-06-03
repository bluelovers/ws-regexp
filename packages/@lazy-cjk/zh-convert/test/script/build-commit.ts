import { crossSpawnGitAsync } from '@git-lazy/spawn';
import { join } from 'path';
import { outputJSON, outputFile } from 'fs-extra';
import CrossSpawn from 'cross-spawn-extra';
import Bluebird from 'bluebird';
import { findTsconfig } from '@yarn-tool/find-tsconfig';
import emitTsFiles from 'build-ts-file';
import { ITable } from '../../lib/types';

const __root = join(__dirname, '../..');

let NO_DEBUG = 0;
//NO_DEBUG = 1;
NO_DEBUG = 2;

interface IOldKeysCache
{
	table_cn2tw: string[],
	table_tw2cn: string[],
}

(async () =>
{
	const _cache_file = join(__root, 'test', 'cache', 'keys.json');
	const _old_cache_file = join(__root, 'test', 'cache', 'old_cache.json');

	let old_keys: IOldKeysCache = await import(_cache_file)
		// @ts-ignore
		.then(m => m.default || m)
		.catch(e => ({
			table_cn2tw: [] as string[],
			table_tw2cn: [] as string[],
		}))
	;

	let old_cache: {
			table_cn2tw: ITable,
			table_tw2cn: ITable,
		} = await import(_old_cache_file)
		// @ts-ignore
		.then(m => m.default || m)
		.catch(e => ({
			table_cn2tw: {},
			table_tw2cn: {},
		}))
	;

	let new_keys: IOldKeysCache = {
		table_cn2tw: [] as string[],
		table_tw2cn: [] as string[],
	};
	let exists_keys: IOldKeysCache = {
		table_cn2tw: [] as string[],
		table_tw2cn: [] as string[],
	};
	let new_changes = {
		table_cn2tw: [] as [string, string, string][],
		table_tw2cn: [] as [string, string, string][],
	};

	let file = join(__dirname, '../../lib/', 'table.ts');

	await emitTsFiles(file, {
		verbose: true,
	})

	const { table_cn2tw, table_tw2cn } = await import('../../lib/table');

	Object.keys(table_cn2tw)
		.forEach((key) =>
		{
			if (!old_keys.table_cn2tw.includes(key))
			{
				new_keys.table_cn2tw.push(key);
			}

			if (table_cn2tw[key] !== old_cache.table_cn2tw[key])
			{
				new_changes.table_cn2tw.push([key, old_cache.table_cn2tw[key], table_cn2tw[key]])
			}

			exists_keys.table_cn2tw.push(key);

		})
	;

	Object.keys(table_tw2cn)
		.forEach((key) =>
		{

			if (!old_keys.table_tw2cn.includes(key))
			{
				new_keys.table_tw2cn.push(key);
			}

			if (table_tw2cn[key] !== old_cache.table_tw2cn[key])
			{
				new_changes.table_tw2cn.push([key, old_cache.table_tw2cn[key], table_tw2cn[key]])
			}

			exists_keys.table_tw2cn.push(key);

		})
	;

	if (NO_DEBUG)
	{
		await outputJSON(_cache_file, exists_keys, {
			spaces: 2,
		})

		await outputJSON(_old_cache_file, { table_cn2tw, table_tw2cn }, {
			spaces: 2,
		})
	}

	let msg_title = {
		table_cn2tw: new_keys.table_cn2tw.join('|'),
		table_tw2cn: new_keys.table_tw2cn.join('|'),
	}

	let msg_body = [] as string[];

	console.dir(msg_title);

	msg_body.push(`table_cn2tw`);
	msg_body.push(`-`.repeat(10));
	msg_body.push(``);

	new_changes.table_cn2tw
		.forEach(([c, oc, nc]) =>
		{
			msg_body.push(`\t${c}: { ${oc} => ${nc} }`);
		})
	;

	msg_body.push(``);
	msg_body.push(`=`.repeat(10));
	msg_body.push(``);

	msg_body.push(`table_tw2cn`);
	msg_body.push(`-`.repeat(10));
	msg_body.push(``);

	new_changes.table_tw2cn
		.forEach(([c, oc, nc]) =>
		{
			msg_body.push(`\t${c}: { ${oc} => ${nc} }`);
		})
	;

	let msg_full = `cn2tw ${msg_title.table_cn2tw} , tw2cn ${msg_title.table_tw2cn}\n\n${msg_body.join('\n')}`;

	console.log(msg_full)

	await crossSpawnGitAsync('git', [
		`add`,
		`./lib/table.ts`,
		`./lib/table.js`,
		`./test`,
	], {
		cwd: __root,
		stdio: 'inherit',
	});

	if (NO_DEBUG > 1)
	{
		await crossSpawnGitAsync('git', [
			`commit`,
			`-m`,
			`fix: ${msg_full}`,
			`--`,
			`./lib`,
			`./test`,
		], {
			cwd: __root,
			stdio: 'inherit',
		});
	}

})();
