/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import { _jpTableCmparisonBuild } from '../../lib/core';
import { PLUS_TABLE, PLUS_TABLE_SAFE, skip, skip_00 } from '../../lib/table/core';
import teachKanjiComparison from '../../lib/table/teachKanjiComparison';
import assert from 'assert';
import emitTsFiles from 'build-ts-file';

const data = _jpTableCmparisonBuild({
	PLUS_TABLE,
	PLUS_TABLE_SAFE,
	teachKanjiComparison,
}, {
	skip,
	skip_00,
});

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { IKanjiComparisonTable } from './types';`);

	lines.push(`export const TABLE: IKanjiComparisonTable = [\n${printTable(data.TABLE).join('\n')}\n];`);
	lines.push(`export const TABLE_SAFE: IKanjiComparisonTable = [\n${printTable(data.TABLE_SAFE).join('\n')}\n];`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { IPLUS_TABLE } from './types';`);

	lines.push(`export const PLUS_TABLE: IPLUS_TABLE = [\n${printTable(data.PLUS_TABLE).join('\n')}\n];`);
	lines.push(`export const PLUS_TABLE_SAFE: IPLUS_TABLE = [\n${printTable(data.PLUS_TABLE_SAFE).join('\n')}\n];`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.plus.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

function printTable(arrayTable: any[])
{
	assert(Array.isArray(arrayTable));

	let ls = [] as string[];

	for (const v of arrayTable)
	{
		ls.push(`\t${JSON.stringify(v)},`);
	}

	return ls;
}
