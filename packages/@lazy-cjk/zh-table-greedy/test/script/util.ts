import Bluebird from 'bluebird';
import { join, dirname, resolve } from "path";
// @ts-ignore
import * as ts from "typescript";
import emitTsFiles from 'build-ts-file';

const __root = join(__dirname, '../..');

export async function tryBuild(includeSource?: boolean)
{
	console.log(`build start`);

	emitTsFiles(join(__root, 'lib', 'table/re.ts'), {
		verbose: true,
	});

	await Bluebird.delay(1000);

	let r = emitTsFiles(join(__root, 'lib', 'table.ts'), {
		verbose: true,
	});

	console.log(`build end`);
}
