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

	lines.push(`export const table_jp_core = ${printStringify(table_jp_core)} as const;`);

	lines.push(`export const table_plus_core = ${printStringify(table_plus_core)} as const;`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table/raw.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { ISimpleTable } from './types';`);

	const table_plus = _buildTablePlus(table_plus_core);

	lines.push(`export const table_plus: Record<${printKeyType(Object.keys(table_plus))}, string[]> = ${printStringify(table_plus)};`);

	const table_jp = _mergeTable(table_jp_core, table_plus);

	_uniqueTable(table_jp);

	lines.push(`export const table_jp: Record<${printKeyType(Object.keys(table_jp))}, string[]> = ${printStringify(table_jp)};`);

	let _table_cn: ISimpleTable = _update({}, _table_tw);

	lines.push(`export const _table_cn: ISimpleTable = ${printStringify(_table_cn)};`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

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
