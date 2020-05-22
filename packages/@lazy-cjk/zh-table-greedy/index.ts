/**
 * Created by user on 2020/5/22.
 */

import { _greedyTableBuild } from './lib/core';
import { _greedyTableCacheTest, _greedyTableCacheMap, _greedyTableCacheRegexp } from './lib/table';

export { _greedyTableCacheTest, _greedyTableCacheMap, _greedyTableCacheRegexp }

export { _greedyTableBuild }

export function greedyTableTest(input: string)
{
	return _greedyTableCacheTest.test(input)
}

export function greedyTableCharArray(char: string)
{
	return _greedyTableCacheMap.get(char)
}

export function greedyTableReplace(input: string): string
{
	if (greedyTableTest(input))
	{
		return _greedyTableCacheRegexp
			.reduce(function (input, r)
			{
				return input.replace(r[0], r[1])
			}, input)
			;
	}

	return input
}

export default exports as typeof import('./index');
