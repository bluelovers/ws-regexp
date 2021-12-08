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
import { IPLUS_TABLE, ITeachKanjiComparison, IKanjiComparisonTable } from '../../lib/types';
import { array_unique_overwrite, array_unique } from 'array-hyper-unique';
import { sortBySlugify } from '@lazy-cjk/sort';
import { compareCaseInsensitive } from '@bluelovers/string-natural-compare';
import { lineSplit } from 'crlf-normalize';

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

	sortTable(data.TABLE);
	sortTable(data.TABLE_SAFE);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
	lines.push(`export const TABLE: IKanjiComparisonTable = [\n${printTable(data.TABLE).join('\n')}\n];`);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
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

	sortTablePlus(data.PLUS_TABLE);
	sortTablePlus(data.PLUS_TABLE_SAFE);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
	lines.push(`export const PLUS_TABLE: IPLUS_TABLE = [\n${printTable(data.PLUS_TABLE).join('\n')}\n];`);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
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

	keys = array_unique(keys).sort(comp);

	await (async () => {

		const lines = [] as string[];

		lines.push(``);

		let re = new RegExp(`[${keys.join('')}]`, 'u');

		lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
		lines.push(`export const _re_table_keys = ${re.toString()};`);

		lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
		lines.push(`export  default _re_table_keys`);

		lines.push(``);

		let file = join(__dirname, '../../lib/', 'table.re.ts');

		await outputFile(file, lines.join('\n\n'))

		await emitTsFiles(file)

	})();

	await (async () => {

		const lines = [] as string[];

		lines.push(``);

		lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison/lib/table/core.ts;\nDO NOT EDIT.\n@see {@link ./table/core.ts}`));
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

function comp(s1, s2)
{
	if (!s1 || !s2)
	{
		return 0
	}

	//return compareCaseInsensitive(s1, s2)
	return sortBySlugify(s1, s2)
}

function sortTable(table: IKanjiComparisonTable)
{
	return table.sort((s1, s2) => {
		return comp(s1[0]?.[0], s2[0]?.[0])
	})
}

function sortTablePlus(table: IPLUS_TABLE)
{
	return table.sort((s1, s2) => {
		return comp(s1[0], s2[0])
	})
}

function printJSDOC(msg: string)
{
	const c = '\n * ';

	return `/**${c}${lineSplit(msg).join(c)}${c}/`
		.replace(/\*\s+\/$/, '*/');
}
