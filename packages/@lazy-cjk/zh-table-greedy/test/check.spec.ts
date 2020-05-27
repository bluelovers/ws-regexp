import { _greedyTableCacheRegexp } from '../lib/table/re';
import { reToStringList } from '../lib/util';

describe(`validate char of map`, () =>
{
	const _greedyTableCacheMap = new Map<string, string[]>();

	_greedyTableCacheRegexp
		.forEach(([re, char]) => {

			const a = reToStringList(re, char)

			test(a.join('|'), () =>
			{

				expect(a).not.toContain('|');

				a.forEach(c =>
				{
					const bool = _greedyTableCacheMap.has(c);

					if (bool)
					{
						console.log(c, _greedyTableCacheMap.get(c))
					}

					expect(bool)
						.toBeFalsy()
					;

					_greedyTableCacheMap.set(c, a)
				});

				expect(a).toMatchSnapshot();

			});

		})
	;

})
