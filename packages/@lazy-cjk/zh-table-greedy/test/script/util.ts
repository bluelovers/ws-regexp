import Bluebird from 'bluebird';
import { join, dirname, resolve } from "path";
import CrossSpawn from 'cross-spawn-extra';
import { findTsconfig } from '@yarn-tool/find-tsconfig';
// @ts-ignore
import * as ts from "typescript";
import { readJSON, readFile } from 'fs-extra';
import emitTsFiles from 'build-ts-file';

const __root = join(__dirname, '../..');

export async function tryBuild(includeSource?: boolean)
{
	console.log(`build start`);

	let cwd_ts = dirname(findTsconfig(__root));

	console.dir(cwd_ts)

	if (includeSource)
	{
		await CrossSpawn.async('yarn', [
			`run`,
			`build`,
		], {
			cwd: __root,
			stdio: 'inherit',
		})
		;

		//await Bluebird.delay(1000);
	}

	/*
	await CrossSpawn.async('tsc', [
		join(__root, 'lib', 'table.ts'),
	], {
		cwd: cwd_ts,
		stdio: 'inherit',
	})
	;

	 */

	emitTsFiles(join(__root, 'lib', 'table/re.ts'), {
		verbose: true,
	});

	await Bluebird.delay(1000);

	let r = emitTsFiles(join(__root, 'lib', 'table.ts'), {
		verbose: true,
	});

	console.dir(r);

	//await Bluebird.delay(1000);

	/*
	await CrossSpawn.async('ts-node', [
		join(__root, 'lib', 'table.ts'),
	], {
		cwd: cwd_ts,
		stdio: 'inherit',
	})
	;
	 */

	//await Bluebird.delay(1000);

	console.log(`build end`);
}
