import { _greedyTableCacheMap, greedyTableTest, greedyTableCharArray } from '..';

describe(`_greedyTableCacheMap`, () =>
{

	for (const [k, v] of _greedyTableCacheMap.entries())
	{
		test(k, () =>
		{

			let v2 = greedyTableCharArray(k);

			expect(greedyTableTest(k)).toBeTruthy();
			expect(v.length).toBeGreaterThanOrEqual(2);
			expect(v2.length).toBeGreaterThanOrEqual(2);
			expect(v).toStrictEqual(v2);

			v.forEach(k2 => expect(greedyTableCharArray(k2)).toStrictEqual(v))

		});

	}

})
