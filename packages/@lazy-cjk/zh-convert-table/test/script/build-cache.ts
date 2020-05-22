/**
 * Created by user on 2020/5/22.
 */

import { outputFile, outputJSON } from 'fs-extra';
import { join } from 'path';
import { wiki_s2t, wiki_t2s, wiki_s2t_v2, wiki_t2s_v2 } from '../raw/wikipedia';
import { table_cn2tw, table_tw2cn } from '../raw/table';

;(async () => {

	const lines = [] as string[];

	lines.push(`import { ITable } from './lib/types';`);

	lines.push(`export const wiki_s2t: ITable = {\n${printTable(wiki_s2t).join('\n')}\n};`);

	lines.push(`export const wiki_t2s: ITable = {\n${printTable(wiki_t2s).join('\n')}\n};`);

	lines.push(`export const wiki_s2t_v2: ITable = {\n${printTable(wiki_s2t_v2).join('\n')}\n};`);

	lines.push(`export const wiki_t2s_v2: ITable = {\n${printTable(wiki_t2s_v2).join('\n')}\n};`);

	lines.push(`export default exports as typeof import('./wikipedia');`);

	lines.push(``);

	await outputFile(join(__dirname, '../../', 'wikipedia.ts'), lines.join('\n\n'))

})();

;(async () => {

	const lines = [] as string[];

	lines.push(`import { ITable } from './lib/types';`);

	lines.push(`export const table_cn2tw: ITable = {\n${printTable(table_cn2tw).join('\n')}\n};`);

	lines.push(`export const table_tw2cn: ITable = {\n${printTable(table_tw2cn).join('\n')}\n};`);

	lines.push(`export default exports as typeof import('./table');`);

	lines.push(``);

	await outputFile(join(__dirname, '../../', 'table.ts'), lines.join('\n\n'))

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
