import rewriteFlags, { flagsOrderReverse, IOptionsRewriteFlags } from '../flags';
import { inspect } from 'util';

describe(`add`, () =>
{

	const maxLength = flagsOrderReverse.length;

	flagsOrderReverse
		.forEach((key, i) =>
		{

			let options = flagsOrderReverse
				.slice(i)
				.reduce((a, b) =>
				{

					a[b] = true;

					return a
				}, {} as IOptionsRewriteFlags);

			it(inspect(options), () =>
			{
				let actual = rewriteFlags(options)

				expect(actual).toHaveLength(maxLength - i);

				expect(actual).toMatchSnapshot();
			})

		})
	;
});

describe(`remove`, () =>
{
	const flags = `gimsuy`;

	const maxLength = flags.length;

	flagsOrderReverse
		.forEach((key, i) =>
		{

			let options = flagsOrderReverse
				.slice(i)
				.reduce((a, b) =>
				{

					a[b] = false;

					return a
				}, {} as IOptionsRewriteFlags);

			it(inspect(options), () =>
			{
				let actual = rewriteFlags(flags, options)

				expect(actual).toHaveLength(i);

				expect(actual).toMatchSnapshot();
			})

		})
	;
});
