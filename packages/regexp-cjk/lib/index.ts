/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */

import { zhRegExp } from '..';
import { _word_zh_core } from './conv';
//export * from './v1';

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

export { _word_zh_core }
