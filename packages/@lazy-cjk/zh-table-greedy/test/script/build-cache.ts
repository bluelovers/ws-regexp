/**
 * Created by user on 2020/5/22.
 */

import { _greedyTableCacheTest, _greedyTableCacheMap, _greedyTableCacheRegexp } from '../raw/table-raw';

import { outputFile } from 'fs-extra';
import { join } from 'path';

(async () => {

	const lines = [] as string[];

	lines.push(`import { _greedyTableCacheRegexp } from './table/re';`);

	lines.push(`export { _greedyTableCacheRegexp };`);

	lines.push(`export const _greedyTableCacheTest = ${_greedyTableCacheTest.toString()};`);

	let ls = [] as string[];

	for (const [k, v] of _greedyTableCacheMap
		.entries())
	{
		ls.push(`\t[${JSON.stringify(k)}, ${JSON.stringify(v)}],`);
	}

	lines.push(`export const _greedyTableCacheMap = new Map<string, readonly string[]>([\n${ls.join('\n')}\n]);`);

	lines.push(``);

	await outputFile(join(__dirname, '../../lib/', 'table.ts'), lines.join('\n\n'))

})();
