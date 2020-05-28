/**
 * Created by user on 2018/6/10/010.
 */

import { jp2zht, jp2zhs, cjk2jp, cjk2zhs, cjk2zht } from '@lazy-cjk/jp-table-convert';
import libTable from '@lazy-cjk/zh-table-alias';
import jpList from '@lazy-cjk/jp-table-alias';
import { greedyTableCharArray } from '@lazy-cjk/zh-table-greedy';
import { _wrapFn, _get } from './lib/util';
import { IOptions } from './lib/types';

export * from './lib/types';

/**
 * 取出此漢字所對應的繁漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export const tw = _wrapFn('tw');

/**
 * 取出此漢字所對應的簡漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export const cn = _wrapFn('cn');

/**
 * 取出此漢字所對應的日漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export const jp = _wrapFn('jp');

/**
 * 自動取出此漢字所對應的簡繁日漢字
 *
 * @param {string} char
 * @param {IOptions} options
 * @returns {string[]}
 */
export function auto(char: string, options: IOptions = {}): string[]
{
	if (!char)
	{
		return null;
	}

	if (options.skip && options.skip.indexOf(char) != -1)
	{
		return [char];
	}

	let jt = jp2zht(char);
	let js = jp2zhs(char);

	let greedyTable: number = (options.greedyTable as any) | 0;

	let a = _get([],
		char,
		libTable.tw(char, options),
		libTable.cn(char, options),
		(!options.skip || options.skip.indexOf(jt) == -1) && libTable.cn(jt, options),
		(!options.skip || options.skip.indexOf(js) == -1) && libTable.tw(js, options),
		libTable.jp(char, options),

		(greedyTable && cjk2jp(char)),
		(greedyTable && cjk2zhs(char)),
		(greedyTable && cjk2zht(char)),

		(greedyTable && jpList.zh2jp(char, {
			safe: greedyTable <= 1
		})),
		(greedyTable && jpList.jp2zh(char, {
			safe: greedyTable <= 1
		})),

		(greedyTable > 1 && greedyTableCharArray(char)),
	);

	/*
	if (!skip || skip.indexOf(jt) == -1)
	{
		a = a.concat(...cn(jt));
	}
	if (!skip || skip.indexOf(js) == -1)
	{
		a = a.concat(...tw(js));
	}

	if (zhtw_convert.table_jp[char])
	{
		a = a.concat(jp(char));
	}

	a = array_unique(a);
	a.sort();
	*/

	return a;
}

export default exports as typeof import('./index');
