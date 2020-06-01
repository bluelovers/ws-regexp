import { _greedyTableCacheRegexp } from '../lib/table/re';
import { reToStringList } from '../lib/util';
import { _re_cjk_conv } from 'regexp-cjk/lib/util';
import { _greedyTableCacheTest } from '../lib/table';

const reTest = _re_cjk_conv('u');

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

					expect(c)
						.toMatch(reTest)
					;

					expect(c)
						.toMatch(_greedyTableCacheTest)
					;

					_greedyTableCacheMap.set(c, a)
				});

				expect(a).toMatchSnapshot();

			});

		})
	;

})
