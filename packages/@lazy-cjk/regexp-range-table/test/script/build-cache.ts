/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import emitTsFiles from 'build-ts-file';
import list_range, { list_range_raw } from '../raw/table/roman';
import assert from 'assert';
import { array_unique_overwrite, array_unique } from 'array-hyper-unique';
import { __ROOT } from '../__root';

(async () => {

	const lines = [] as string[];

	const { list_range, list_range_raw } = await import('../raw/table/roman');

	//lines.push(``);

	lines.push(`/**\n * roman\n */\nexport const list_range_raw = ${printStringify(list_range_raw)};`);
	lines.push(`/**\n * roman\n */\nexport const list_range = ${printStringify(list_range)};`);
	lines.push(`export default list_range;`);

	lines.push(``);

	let file = join(__ROOT, 'src', 'table/roman.ts');

	await outputFile(file, lines.join('\n\n'))

})();

(async () =>
{

	const lines = [] as string[];

	const { list_range, list_range_raw } = await import('../raw/table/circle');

	lines.push(`/**
 * @link https://unicode-table.com/cn/blocks/enclosed-alphanumerics/
 */`);

	lines.push(`/**\n * circle\n */\nexport const list_range_raw = ${printStringify(list_range_raw)};`);
	lines.push(`/**\n * circle\n */\nexport const list_range = ${printStringify(list_range)};`);
	lines.push(`export default list_range;`);

	lines.push(``);

	let file = join(__ROOT, 'src', 'table/circle.ts');

	await outputFile(file, lines.join('\n\n'))

})();

(async () =>
{

	const lines = [] as string[];

	const { list_range, list_range2 } = await import('../raw/table/chinese');

	lines.push(`/**\n * chinese\n */\nexport const list_range = ${printStringify(list_range)};`);
	lines.push(`/**\n * chinese2\n */\nexport const list_range2 = ${printStringify(list_range2)};`);
	lines.push(`export default list_range;`);

	lines.push(``);

	let file = join(__ROOT, 'src', 'table/chinese.ts');

	await outputFile(file, lines.join('\n\n'))

})();

function printStringify(data: any)
{
	return JSON.stringify(data, null, `\t`)
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
