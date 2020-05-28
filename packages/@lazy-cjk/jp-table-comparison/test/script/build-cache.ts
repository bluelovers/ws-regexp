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
import { IPLUS_TABLE } from '../../lib/types';
import { array_unique_overwrite, array_unique } from 'array-hyper-unique';

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

(async () => {

	let keys = table2array(data.PLUS_TABLE)
		.concat(table2array(data.PLUS_TABLE_SAFE))
		.concat(table2array(data.TABLE as any))
		.concat(table2array(data.TABLE_SAFE as any))
	;

	keys = array_unique(keys).sort();

	await (async () => {

		const lines = [] as string[];

		lines.push(``);

		let re = new RegExp(`[${keys.join('')}]`, 'u');

		lines.push(`export const _re_table_keys = ${re.toString()};`);

		lines.push(`export  default _re_table_keys`);

		lines.push(``);

		let file = join(__dirname, '../../lib/', 'table.re.ts');

		await outputFile(file, lines.join('\n\n'))

		await emitTsFiles(file)

	})();

	await (async () => {

		const lines = [] as string[];

		lines.push(``);

		lines.push(`export const _table_keys = [\n${printTable(keys).join('\n')}\n];`);

		lines.push(`export  default _table_keys`);

		lines.push(``);

		let file = join(__dirname, '../../lib/', 'table.keys.ts');

		await outputFile(file, lines.join('\n\n'))

		await emitTsFiles(file)

	})();

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

function table2array(table: IPLUS_TABLE)
{
	let ls: string[] = [];

	table
		.forEach(record => {

			record
				.forEach(s => {

					if (Array.isArray(s))
					{
						s
							.forEach(s => {
								(typeof s === 'string') && ls.push(s)
							})
						;
					}
					else if (typeof s === 'string')
					{
						ls.push(s)
					}

				})
			;

		})

	return ls
}
