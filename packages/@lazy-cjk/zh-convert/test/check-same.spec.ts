import table_same from '@lazy-cjk/zh-convert-table/lib/table/table_same';
import { cn2tw, tw2cn } from '../index';

describe(`check char should be same`, () =>
{

	table_same
		.forEach(char => {

			test(`${char} cn2tw`, () =>
			{
				expect(cn2tw(char)).toStrictEqual(char);
			});

			test(`${char} tw2cn`, () =>
			{
				expect(tw2cn(char)).toStrictEqual(char);
			});

		})
	;

})

