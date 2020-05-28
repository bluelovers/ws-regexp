import { array_unique } from 'array-hyper-unique';
import { _get as _get_core } from '@lazy-cjk/zh-table-alias/lib/util/core';
import libTable from '@lazy-cjk/zh-table-alias';
import { IOptions } from './types';

export function _get(a, value, ...values)
{
	a = _get_core(a, value, ...values);

	return array_unique(a).sort();
}

export function _wrapFn(fn: string)
{
	return function (char: string, options: IOptions = {}): string[]
	{
		if (!char)
		{
			return null;
		}

		if (options.skip && options.skip.indexOf(char) != -1)
		{
			return [char];
		}

		let a = libTable[fn](char, options);

		a = array_unique(a);
		a.sort();

		return a;
	}
}
