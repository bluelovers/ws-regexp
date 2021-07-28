/**
 * Created by user on 2020/5/22.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import assert from 'assert';
import emitTsFiles from 'build-ts-file';
import { _build_table } from '../../lib/core';
import { ZHJP_TABLE, ZHJP_TABLE_SAFE } from '@lazy-cjk/jp-table-comparison';
import { crlf, lineSplit } from 'crlf-normalize';

const data = _build_table(ZHJP_TABLE, ZHJP_TABLE_SAFE);

(async () => {

	const lines = [] as string[];

	lines.push(``);

	lines.push(`import { ITABLE_MAIN } from './types';`);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison;\nDO NOT EDIT.\n@see {@link @lazy-cjk/jp-table-comparison}`));
	lines.push(`export const TABLE_KEYS = ${printTable(Object.keys(data.TABLE))} as const;`);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison;\nDO NOT EDIT.\n@see {@link @lazy-cjk/jp-table-comparison}`));
	lines.push(`export const TABLE: ITABLE_MAIN = ${printTable(data.TABLE)};`);

	lines.push(printJSDOC(`Code generated from @lazy-cjk/jp-table-comparison;\nDO NOT EDIT.\n@see {@link @lazy-cjk/jp-table-comparison}`));
	lines.push(`export const TABLE_SAFE: ITABLE_MAIN = ${printTable(data.TABLE_SAFE)};`);

	lines.push(``);

	let file = join(__dirname, '../../lib/', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

function printTable(table)
{
	return JSON.stringify(table, null, `\t`);
}

function printJSDOC(msg: string)
{
	const c = '\n * ';

	return `/**${c}${lineSplit(msg).join(c)}${c}/`
		.replace(/\*\s+\/$/, '*/');
}
