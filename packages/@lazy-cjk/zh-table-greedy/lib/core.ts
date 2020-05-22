/**
 * Created by user on 2020/5/22.
 */

import UString from 'uni-string';
import { array_unique } from 'array-hyper-unique';

export function _greedyTableBuild(data: [RegExp, string][]): {
	_greedyTableCacheRegexp: readonly (readonly [RegExp, string])[];
	_greedyTableCacheMap: Map<string, readonly string[]>;
	_greedyTableCacheTest: RegExp;
}
{
	const _greedyTableCacheRegexp: [RegExp, string][] = data;

	let _greedyTableCacheMap: Map<string, string[]>;
	let _greedyTableCacheTest: RegExp;

	_greedyTableCacheMap = new Map<string, string[]>();

	let arr = _greedyTableCacheRegexp
		.reduce(function (arr, r)
		{
			let s = r[0].source
				.replace(/^.*\[|\].*$/ug, '')
			;

			let a = UString.split(s, '').concat(r[1]);

			a.forEach(c =>
			{
				_greedyTableCacheMap.set(c, a)
			});

			arr.push(...a);

			return arr;
		}, [] as string[])
	;

	_greedyTableCacheTest = new RegExp(`[${array_unique(arr).join('')}]`, 'u');

	return {
		_greedyTableCacheRegexp,
		_greedyTableCacheMap,
		_greedyTableCacheTest,
	};
}
