import { inspect } from "util";
import rewritePattern, { rewritePatternByRegExp, rewriteRegExp, IOptionsRewritePattern } from '../index';
import { handleOptions } from '../lib/util';

interface ITestCase
{
	args: [string, string?, IOptionsRewritePattern?],
	expected?: string,
	error?: boolean,
}

describe(`simple`, () =>
{
	([
		{
			args: ['foo.bar'],
		},
		{
			args: ['foo.bar', 'u'],
		},
		{
			args: ['[\\u{1D306}-\\u{1D308}a-z]', 'u'],
		},
		{
			args: ['[\\u{1D306}-\\u{1D308}a-z]', 'ui'],
		},
		{
			args: ['.', 'u'],
		},
		{
			args: ['.', 'u', {
				'dotAllFlag': false,
			}],
		},
		{
			args: ['.', '', {
				'dotAllFlag': true,
			}],
		},
		{
			args: ['.', 'su', {
				'dotAllFlag': false,
			}],
		},
		{
			args: ['.', 'su', {
				'dotAllFlag': true
			}],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u'],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': true
			}],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': false
			}],
		},
		{
			args: ['(?<=.)a'],
		},
		{
			args: ['(?<=.)a', '', {
				'lookbehind': true
			}],
		},
		{
			args: ['(?<=.)a', '', {
				'lookbehind': false
			}],
			error: true,
		},
		{
			args: ['(?<name>.)\\k<name>'],
			//expected: `(.)\\1`,
		},
		{
			args: ['(?<name>.)\\k<name>', '', {
				'namedGroup': true
			}],
			//expected: `(.)\\1`,
		},
		{
			args: ['(?<name>.)\\k<name>', '', {
				'namedGroup': false
			}],
			error: true,
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': true,
				'useUnicodeFlag': true
			}],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': true,
				'useUnicodeFlag': false
			}],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': false,
				'useUnicodeFlag': true
			}],
		},
		{
			args: ['\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': false,
				'useUnicodeFlag': false
			}],
		},
		{
			args: [],
		},
		{
			args: [],
		},
		{
			args: [],
		},
		{
			args: [],
		},
		{
			args: [],
		},
	] as ITestCase[]).forEach(testCase =>
	{
		const { args, expected } = testCase;

		if (!args.length)
		{
			return;
		}

		describe((testCase.error ? 'ThrowError ' : '') + inspect(args), () =>
		{
			if (args[2])
			{
				test(`options`, () =>
				{
					let actual = handleOptions(args[2], args[1]);
					expect(actual).toMatchSnapshot();
				})
			}

			if (testCase.error)
			{
				test(`throw error`, () =>
				{
					expect(() => rewritePattern(...args)).toThrowError();

					let re = new RegExp(args[0], args[1])

					expect(() => rewritePatternByRegExp(re, args[2])).toThrowError();

					expect(() => rewriteRegExp(re, args[2])).toThrowError();
				})

				return;
			}

			test(`test`, () =>
			{

				let actual = rewritePattern(...args);

				let re = new RegExp(args[0], args[1])

				let actual2 = rewritePatternByRegExp(re, args[2]);

				let actual3 = rewriteRegExp(re, args[2]);

				console.log(actual)
				console.log(actual3)

				if (typeof expected !== 'undefined')
				{
					expect(actual).toStrictEqual(expected);
				}

				expect(actual).toStrictEqual(actual2);
				expect(actual).toStrictEqual(actual3.source);

				//expect(actual).toBeInstanceOf(Date);

				expect(actual).toMatchSnapshot();
				expect(actual3).toMatchSnapshot();

			});
		})



	})
	;

})
