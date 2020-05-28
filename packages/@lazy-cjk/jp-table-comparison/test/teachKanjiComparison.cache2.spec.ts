import root from '../lib/table/teachKanjiComparison.cache2';

describe(`check data`, () =>
{

	it(`check keys`, () =>
	{
		const keys = Object.keys(root);

		expect(keys)
			.toStrictEqual(['jp', 'zht', 'zhs'])
		;

		expect(keys.length).toMatchSnapshot();
	})

	Object.entries(root)
		.forEach(([top_key, record]) => {

			describe(top_key, () =>
			{
				const entries = Object.entries(record);

				it(`check entries`, () =>
				{
					expect(entries.length).toBeGreaterThan(1);
					expect(entries.length).toMatchSnapshot();
				});

				entries
					.forEach(([record_key, sub]) => {

						it(record_key, () =>
						{

							expect(Object.keys(sub))
								.toStrictEqual(['jp', 'zht', 'zhs'])
							;

							expect(sub).toMatchObject({
								jp: expect.any(String),
								zht: expect.any(String),
								zhs: expect.any(String),
							})

							expect(sub).toMatchSnapshot();

						})

					})
				;

			})

		})
	;

});

