import { slugify } from '@lazy-cjk/zh-slugify';
import { compareCaseInsensitive } from '@bluelovers/string-natural-compare/core';

let cacheMap: Map<string, string>;
let _get: (s: string) => string;

resetCacheMap();

export function resetCacheMap(): {
	cacheMap: Map<string, string>,
	_get(s: string): string,
}
{
	cacheMap?.clear?.();
	cacheMap = new Map<string, string>();

	_get = (s: string) => {
		if (!cacheMap.has(s))
		{
			let n = slugify(s, false);
			cacheMap.set(s, n);
			return n;
		}

		return cacheMap.get(s)
	};

	return {
		cacheMap,
		_get,
	}
}

export function getCacheMap()
{
	return cacheMap
}

export function sortBySlugify(s1: string, s2: string): number
{
	if (s1 === s2)
	{
		return 0
	}

	return compareCaseInsensitive(_get(s1), _get(s2))
}

export default sortBySlugify
