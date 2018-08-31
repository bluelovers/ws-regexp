/**
 * Created by user on 2018/5/5/005.
 */

import cjkConv from 'cjk-conv';

//console.log(cjkConv.zhTable.auto('魯'));

export function _word_zh_core(search: string, skip?: string)
{
	return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = cjkConv.zhTable.auto(char);

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export function _word_zh_core2(search: string, skip?: string)
{
	return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let a = cjkConv.zhTable.auto(char);

		return a.join('');
	});
}

import * as self from './conv';
export default self;

