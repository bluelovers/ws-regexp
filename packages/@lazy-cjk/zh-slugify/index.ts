/**
 * Created by user on 2020/5/29.
 */

import { greedyTableReplace } from '@lazy-cjk/zh-table-greedy';
import { IOptions, charTableList } from '@lazy-cjk/zh-table-list/list';

/**
 * 用來標準化字串 作為排序用
 */
export function slugify(input: string, options?: IOptions, unsafe2?: boolean): string
/**
 * 用來標準化字串 作為排序用
 */
export function slugify(input: string, unsafe2?: boolean): string
/**
 * 用來標準化字串 作為排序用
 */
export function slugify(input: string, options: IOptions | boolean = {}, unsafe2?: boolean): string
{
	if (typeof options === 'boolean')
	{
		[unsafe2, options] = [options, {}];
	}

	options = (options || {}) as IOptions;

	options = {
		...options,
		optionsZhTable: {
			safe: false,
			greedyTable: true,
			...options.optionsZhTable,
		},
	};

	let k = unsafe2 ? greedyTableReplace(input) : input;
	let arr: string[][] = charTableList(k, options);

	return arr
		.reduce(function (s, a)
		{
			s.push(a[0]);
			return s
		}, [])
		.join('')
}

export default slugify
