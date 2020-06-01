import table_same from '@lazy-cjk/zh-convert-table/lib/table/table_same';
import { cn2tw, tw2cn } from '../index';
import table_1v1 from '@lazy-cjk/zh-convert-table/lib/table/table_1v1';

describe(`check char`, () =>
{
	Object
		.entries(table_1v1)
		.forEach(([t, c]) =>
		{

			test(`${c} cn2tw ${t}`, () =>
			{
				expect(c).toStrictEqual(t);
				expect(cn2tw(c)).toStrictEqual(t);

			});

			test(` ${t} tw2cn ${c}`, () =>
			{
				expect(t).toStrictEqual(c);
				expect(tw2cn(t)).toStrictEqual(c);
			});

		})
	;

})

