/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import emitTsFiles from 'build-ts-file';
import emoji from 'emoji.json';
import { _build } from '../../lib/core';

const data = _build(emoji);

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`export const reEmoji = ${data.reEmoji.toString()};`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 're.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`export const mapEmoji = new Map(${printTable(data.entriesEmoji)});`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

function printTable(table)
{
	return JSON.stringify(table, null, `\t`);
}
