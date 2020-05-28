/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import assert from 'assert';
import emitTsFiles from 'build-ts-file';
import { table_cn2tw, table_tw2cn } from '../raw/table';

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { ITable } from './types';`);

	lines.push(`export const table_cn2tw: ITable = ${printTable(table_cn2tw)};`);

	lines.push(`export const table_tw2cn: ITable = ${printTable(table_tw2cn)};`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

function printTable(table)
{
	return JSON.stringify(table, null, `\t`);
}
