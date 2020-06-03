/**
 * Created by user on 2020/5/22.
 */

import { outputFile, outputJSON } from 'fs-extra';
import { join } from 'path';
import { wiki_s2t, wiki_t2s, wiki_s2t_v2, wiki_t2s_v2 } from '../raw/wikipedia';
import { table_cn2tw, table_tw2cn } from '../raw/table';
import emitTsFiles from 'build-ts-file';

;(async () => {

	const lines = [] as string[];

	lines.push(`import { ITable } from './lib/types';`);

	let tsdoc_s2t = `/**
 * Wikipedia:繁简处理/简繁单字
 * https://zh.wikipedia.org/wiki/Wikipedia:%E7%B9%81%E7%AE%80%E5%A4%84%E7%90%86/%E7%AE%80%E7%B9%81%E5%8D%95%E5%AD%97
 */`;
	let tsdoc_t2s = `/**
 * Wikipedia:繁简处理/繁简单字
 * https://zh.wikipedia.org/wiki/Wikipedia:%E7%B9%81%E7%AE%80%E5%A4%84%E7%90%86/%E7%B9%81%E7%AE%80%E5%8D%95%E5%AD%97
 */`;

	lines.push(`${tsdoc_s2t}\nexport const wiki_s2t: ITable = {\n${printTable(wiki_s2t).join('\n')}\n};`);

	lines.push(`${tsdoc_t2s}\nexport const wiki_t2s: ITable = {\n${printTable(wiki_t2s).join('\n')}\n};`);

	lines.push(`${tsdoc_s2t}\nexport const wiki_s2t_v2: ITable = {\n${printTable(wiki_s2t_v2).join('\n')}\n};`);

	lines.push(`${tsdoc_t2s}\nexport const wiki_t2s_v2: ITable = {\n${printTable(wiki_t2s_v2).join('\n')}\n};`);

	lines.push(`export default exports as typeof import('./wikipedia');`);

	lines.push(``);

	let file = join(__dirname, '../../', 'wikipedia.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file, {
		verbose: true,
	})

})();

;(async () => {

	const lines = [] as string[];

	lines.push(`import { ITable } from './lib/types';`);

	lines.push(`export const table_cn2tw: ITable = {\n${printTable(table_cn2tw).join('\n')}\n};`);

	lines.push(`export const table_tw2cn: ITable = {\n${printTable(table_tw2cn).join('\n')}\n};`);

	lines.push(`export default exports as typeof import('./table');`);

	lines.push(``);

	let file: string;
	file = join(__dirname, '../../', 'table.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file, {
		verbose: true,
	})

	await outputJSON(join(__dirname, '../../', 'table_cn2tw.json'), table_cn2tw, {
		spaces: 2,
	})

	await outputJSON(join(__dirname, '../../', 'table_tw2cn.json'), table_tw2cn, {
		spaces: 2,
	})

})();

function printTable(arrayTable: Record<string, string>)
{
	let ls = [] as string[];

	for (const [k, v] of Object.entries(arrayTable))
	{
		ls.push(`\t${JSON.stringify(k)}: ${JSON.stringify(v)},`);
	}

	return ls;
}
