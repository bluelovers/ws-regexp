import table_same from '@lazy-cjk/zh-convert-table/lib/table/table_same';
import { cn2tw_min, tw2cn_min } from '../min';

describe(`simple check`, () =>
{

	([

	] as [string, string][]).forEach((ls) =>
	{

		test(ls.join('|'), () =>
		{
			expect(ls[0]).not.toStrictEqual(ls[1]);

			expect(cn2tw_min(ls[0])).not.toStrictEqual(ls[1]);
			expect(tw2cn_min(ls[0])).not.toStrictEqual(ls[1]);

			expect(cn2tw_min(ls[1])).not.toStrictEqual(ls[0]);
			expect(tw2cn_min(ls[1])).not.toStrictEqual(ls[0]);

			expect(cn2tw_min(ls[0], {
				safe: false,
			})).not.toStrictEqual(ls[1]);
			expect(tw2cn_min(ls[0], {
				safe: false,
			})).not.toStrictEqual(ls[1]);

			expect(cn2tw_min(ls[1], {
				safe: false,
			})).not.toStrictEqual(ls[0]);
			expect(tw2cn_min(ls[1], {
				safe: false,
			})).not.toStrictEqual(ls[0]);

		});
	});

	([
		'折',
		'摺',
		'吨',
		'噸',
	] as string[]).forEach((c) =>
	{

		test(c, () =>
		{

			expect(cn2tw_min(c)).toStrictEqual(c);
			expect(tw2cn_min(c)).toStrictEqual(c);

			expect(cn2tw_min(c, {
				safe: false,
			})).toStrictEqual(c);
			expect(tw2cn_min(c, {
				safe: false,
			})).toStrictEqual(c);

		});

	});

});

describe(`known bugs of common table`, () =>
{

	describe(`tw <=> cn`, () =>
	{

		Object.entries({

		} as Record<string, string>).forEach((ls) =>
		{

			test(ls.join(' <=> '), () =>
			{

				expect(cn2tw_min(ls[1])).toStrictEqual(ls[0]);
				expect(tw2cn_min(ls[0])).toStrictEqual(ls[1]);

				expect(cn2tw_min(ls[1], {
					safe: false,
				})).toStrictEqual(ls[0]);
				expect(tw2cn_min(ls[0], {
					safe: false,
				})).toStrictEqual(ls[1]);

			});

		});

	});

	describe(`tw === cn`, () =>
	{

		table_same.forEach((c) =>
		{

			test(c, () =>
			{

				expect(cn2tw_min(c)).toStrictEqual(c);
				expect(tw2cn_min(c)).toStrictEqual(c);

				expect(cn2tw_min(c, {
					safe: false,
				})).toStrictEqual(c);
				expect(tw2cn_min(c, {
					safe: false,
				})).toStrictEqual(c);

			});

		});

	});

});
