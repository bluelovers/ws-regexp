import { _greedyTableCacheMap, greedyTableTest } from '..';

describe(`_greedyTableCacheMap`, () =>
{

	for (const [k, v] of _greedyTableCacheMap.entries())
	{
		test(k, () =>
		{

			expect(greedyTableTest(k)).toBeTruthy();
			expect(v.length).toBeGreaterThanOrEqual(2);

		});
	}

})
