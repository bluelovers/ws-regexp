/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import assert from 'assert';
import emitTsFiles from 'build-ts-file';
import { array_unique_overwrite, array_unique } from 'array-hyper-unique';
import { _table_tw, table_jp_core, table_plus_core } from '../raw/raw';
import { _buildTablePlus, _uniqueTable } from '../../lib/util/unique';
import { _mergeTable } from '../../lib/util/table';
import { ISimpleTable } from '../../lib/types';
import { _update } from '../../lib/util/core';

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`export const _table_tw = ${printStringify(_table_tw)} as const;`);


	lines.push(`/**
 * 此表內只有符合 KEY 值時才會觸發
 */\nexport const table_jp_core = ${printStringify(table_jp_core)} as const;`);

	lines.push(`/**
 * 此表內符合以下任意值時會觸發
 */\nexport const table_plus_core = ${printStringify(table_plus_core)} as const;`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table/raw.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file, {
		verbose: true,
	})

})();

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { ISimpleTable } from './types';`);

	const table_plus = _buildTablePlus(table_plus_core);

	let table_plus_keys = `${printKeyType(Object.keys(table_plus))}`;

	lines.push(`export type ITableJpPlusKeys = ${table_plus_keys}`);

	lines.push(`/**
 * 此表內符合以下任意值時會觸發
 */\nexport const table_plus: Record<ITableJpPlusKeys, string[]> = ${printStringify(table_plus)};`);

	const table_jp = _mergeTable(table_jp_core, table_plus);

	_uniqueTable(table_jp);

	let table_jp_keys = `${printKeyType(Object.keys(table_jp))}`;

	lines.push(`export type ITableJpKeys = ${table_jp_keys}`);

	lines.push(`/**
 * 此表內只有符合 KEY 值時才會觸發
 */\nexport const table_jp: Record<ITableJpKeys, string[]> = ${printStringify(table_jp)};`);

	let _table_cn: ISimpleTable = _update({}, _table_tw);

	lines.push(`export const _table_cn: ISimpleTable = ${printStringify(_table_cn)};`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file, {
		verbose: true,
	})

})();

function printStringify(data: any)
{
	return JSON.stringify(data, null, `\t`)
}

function printKeyType(keys: string[])
{
	keys = keys.map(k => JSON.stringify(k));

	array_unique_overwrite(keys);

	return keys.sort().join(" | ")
}

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
