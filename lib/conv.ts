/**
 * Created by user on 2018/5/5/005.
 */

import zhTable, { IOptions } from 'cjk-conv/lib/zh/table/index';

//console.log(cjkConv.zhTable.auto('魯'));

export function zhTableAutoGreedyTable(s: string, options: IOptions = {})
{
	// @ts-ignore
	options.greedyTable = true;
	return zhTable.auto(s, options)
}

export function _word_zh_core(search: string, skip?: string, zhTableFn = zhTable.auto)
{
	return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = zhTableFn(char);

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export function _word_zh_core2(search: string, skip?: string, zhTableFn = zhTable.auto)
{
	return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = zhTableFn(char);

		return a.join('');
	});
}

export default exports as typeof import('./conv');
