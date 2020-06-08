import { IOptionsRewritePattern } from '../index';
import { inspect } from "util";
import { handleOptions } from '../lib/util';
import { EnumFlagMap } from '../flags';

describe(`handleOptions`, () =>
{

	([
		{},
		{
			flags: "",
		},
		{
			options: {
				rewriteFlags: {
					unicode: false,
				}
			},
		},
		{
			flags: "u",
			options: {
				rewriteFlags: {
					unicode: false,
				}
			},
		},
		{
			options: {
				unicodePropertyEscape: false,
				rewriteFlags: {
					unicode: false,
				}
			},
		},
		{
			flags: "us",
			options: {
				rewriteFlags: {}
			},
		},
		{
			flags: "us",
			options: {
				rewriteFlags: {
					unicode: false,
				}
			},
		},
		{
			flags: "us",
			options: {
				rewriteFlags: {
					unicode: true,
				}
			},
		},
		{
			flags: "us",
			options: {
				flags: "usgi",
				rewriteFlags: {
					unicode: true,
				}
			},
			expected: {
				options: expect.anything(),
				flags: "usgi",
			}
		},
		{
			flags: "us",
			options: {
				flags: "usgi",
				rewriteFlags: {
					unicode: false,
				}
			},
			expected: {
				options: expect.anything(),
				flags: "sgi",
			}
		},
	] as {
		options?: IOptionsRewritePattern,
		flags?: string,
		expected?: {
			options?: IOptionsRewritePattern,
			flags?: string,
		}
	}[])
		.forEach(({ options, flags, expected }) =>
		{
			test(inspect({ options, flags }), () =>
			{

				let actual = handleOptions(options, flags);

				if (expected)
				{
					expect(actual).toStrictEqual(expected);
				}

				expect(actual.options).not.toHaveProperty('flags');

				expect(actual).toHaveProperty('flags');

				expect(actual.options)
					.toHaveProperty('dotAllFlag')
				;

				expect(actual.options)
					.toHaveProperty('lookbehind')
				;

				expect(actual.options)
					.toHaveProperty('namedGroup')
				;

				expect(actual.options)
					.toHaveProperty('useUnicodeFlag')
				;

				expect(actual).toMatchSnapshot();
			})

		})

});
