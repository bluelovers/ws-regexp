/**
 * Created by user on 2020/5/22.
 */

import { array_unique, array_unique_overwrite } from 'array-hyper-unique';
import { reToStringList } from './util';

export function _greedyTableBuild(data: [RegExp, string][] | readonly (readonly [RegExp, string])[]): {

	_greedyTableCacheRegexp: readonly (readonly [RegExp, string])[];
	_greedyTableCacheMap: Map<string, readonly string[]>;
	_greedyTableCacheTest: RegExp;
}
{
	// @ts-ignore
	const _greedyTableCacheRegexp: [RegExp, string][] = data;

	let _greedyTableCacheMap: Map<string, string[]>;
	let _greedyTableCacheTest: RegExp;

	_greedyTableCacheMap = new Map<string, string[]>();

	const arr = _greedyTableCacheRegexp
		.reduce(function (arr, r)
		{
			const a = reToStringList(r[0], r[1])

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
