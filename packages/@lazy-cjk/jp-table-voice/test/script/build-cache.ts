/**
 * Created by user on 2020/5/22.
 */

import { outputFile, outputJSON } from 'fs-extra';
import { join } from 'path';
import { table_voice_core } from '../../lib/table/table_voice_core';
import { _buildTablePlus } from '../../lib/core';

;(async () =>
{

	const lines = [] as string[];

	lines.push(`import { ITableVoiceValues } from './types';`);

	let _table = _buildTablePlus(table_voice_core);

	let _types_key = Object.keys(_table).map(v => '"' + v + '"').join(" | ");


	let _types = `Readonly<Record<ITableVoiceKeys, ITableVoiceValues>>`;


	lines.push(`/**
 * 所有清濁音 字元列表
 */\nexport type ITableVoiceKeys = ${_types_key};`);


	lines.push(`/**
 * 清濁音
 * 'string' => [清音, 濁音, 半濁音]
 */\nexport const table_voice: ${_types} = {\n${printTable(_table).join('\n')}\n};`);

	lines.push(``);

	await outputFile(join(__dirname, '../../lib', 'table.ts'), lines.join('\n\n'))

})();

function printTable(arrayTable: Record<string, any>)
{
	let ls = [] as string[];

	for (const [k, v] of Object.entries(arrayTable))
	{
		ls.push(`\t${JSON.stringify(k)}: ${JSON.stringify(v)},`);
	}

	return ls;
}
