/**
 * Created by user on 2018/5/5/005.
 */

import { auto as zhTableAuto } from '@lazy-cjk/zh-table-list';
import { _re_cjk_conv } from './util';
import { IOptions as IOptionsRegExp } from './core';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';

//console.log(cjkConv.zhTable.auto('魯'));

export function zhTableAutoGreedyTable(s: string, options: IOptionsZhTable = {})
{

	if (true || (options.greedyTable as any | 0) > 1)
	{
		options.safe = false;
	}

	options.greedyTable = options.greedyTable || true;

	return zhTableAuto(s, options)
}

export function _word_zh_core(search: string, skip?: string, zhTableFn = zhTableAuto, options: IOptionsRegExp = {})
{
	let opts: IOptionsZhTable;

	if (options.unsafe || true)
	{
		opts = {
			// @ts-ignore
			greedyTable: options.greedyTable,
			safe: false,
		}
	}

	return search.replace(_re_cjk_conv('ug'), function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = zhTableFn(char, opts);

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export function _word_zh_core2(search: string, skip?: string, zhTableFn = zhTableAuto, options: IOptionsRegExp = {})
{
	let opts: IOptionsZhTable;

	if (options.unsafe || true)
	{
		opts = {
			// @ts-ignore
			greedyTable: options.greedyTable,
			safe: false,
		}
	}

	return search.replace(_re_cjk_conv('ug'), function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = zhTableFn(char, opts);

		return a.join('');
	});
}
