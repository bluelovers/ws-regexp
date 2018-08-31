/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */

import cjkConv from 'cjk-conv';
import { zhRegExp } from '..';
export * from './v1';

export function _word_zh(search: string, ret, flags?, skip?: string)
export function _word_zh(search: RegExp, ret, flags?, skip?: string)
export function _word_zh(search, ret, flags = 'ig', skip?: string)
{
	let s: RegExp | string;

	if (search instanceof RegExp)
	{
		s = new zhRegExp(search, {
			skip,
		});

		flags = s.flags;
	}
	else
	{
		s = new zhRegExp(search, flags, {
			skip,
		}).source;
	}

	return [s, ret, flags];
}

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

//export type valueof<T> = T[keyof T];

import * as self from './index';
export default self;

