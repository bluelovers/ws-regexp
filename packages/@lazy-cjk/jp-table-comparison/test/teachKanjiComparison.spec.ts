import root from '../lib/table/teachKanjiComparison';

describe(`check`, () =>
{

	it(`isArray`, () =>
	{
		expect(Array.isArray(root))
			.toStrictEqual(true)
		;

		expect(root.length).toBeGreaterThan(1);
		expect(root.length).toMatchSnapshot();
	})

	Object.values(root)
		.forEach((record) => {

			const top_key = record.map(v => v.join('|')).join(',');

			describe(top_key, () =>
			{
				it(`length`, () =>
				{
					expect(record).toHaveLength(3);
					expect(record.length).toMatchSnapshot();
				});

				it(`data`, () =>
				{
					expect(record).toMatchObject([
						expect.any(Array),
						expect.any(Array),
						expect.any(Array),
					])
					expect(record).toMatchSnapshot();
				});

				record
					.forEach((sub, index) => {
						describe(index, () =>
						{

							it(`length`, () =>
							{
								expect(sub.length).toBeGreaterThanOrEqual(1);
								expect(sub.length).toMatchSnapshot();
							});

							it(`data`, () =>
							{
								expect(sub).toMatchObject(expect.any(Array))

								sub.forEach(s => expect(typeof s).toStrictEqual('string'));

								expect(sub).toMatchSnapshot();
							});

						})
					})
				;

			})

		})
	;

});

