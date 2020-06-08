import {
	escapeUnicodePropertyPattern,
	matchUnicodePropertyPattern,
	hasUnicodePropertyPattern,
	isUnicodePropertyPattern, replaceUnicodePropertyPattern,
} from '../index';
import { inspect } from 'util';
import escapeStringRegexp from 'escape-string-regexp';
import { IOptionsRewritePattern } from '@regexp-cjk/rewrite-pattern';
import { handleOptions } from '../lib/util';
import { EnumFlagMap } from '@regexp-cjk/rewrite-pattern/flags';

const knownUnicodeProperty = [
	`\\p{Emoji_Presentation}`,
	`\\P{Script_Extensions=Latin}`,
];

const unknownUnicodeProperty = [
	`\\p{UnicodePropertyName=UnicodePropertyValue}`,
	`\\P{UnicodeBinaryPropertyName}`,
];

describe(`escapeUnicodePropertyPattern`, () =>
{
	describe(`allow known property`, () =>
	{
		knownUnicodeProperty.forEach(source =>
		{
			test(inspect(source), () =>
			{
				expect(isUnicodePropertyPattern(source)).toStrictEqual(true);

				let actual = escapeUnicodePropertyPattern(source);
				let actual2 = matchUnicodePropertyPattern(source);

				let expected;

				//expect(actual).toStrictEqual(expected);
				//expect(actual).toBeInstanceOf(Date);
				expect(actual).toMatchSnapshot();
				expect(actual2).toMatchSnapshot();

			});
		})
	})

	describe(`throw error when unknown property`, () =>
	{
		unknownUnicodeProperty.forEach(source =>
		{
			test(inspect(source), () =>
			{

				expect(() => escapeUnicodePropertyPattern(source)).toThrowError()

			});
		})
	});

})

describe(`allow any property like`, () =>
{

	unknownUnicodeProperty.forEach(source =>
	{
		test(inspect(source), () =>
		{

			let actual = matchUnicodePropertyPattern(source);
			let actual2 = isUnicodePropertyPattern(source);
			let actual3 = hasUnicodePropertyPattern(source);

			expect(actual2).toStrictEqual(true);
			expect(actual3).toStrictEqual(true);

			expect(actual).toMatchSnapshot();

		});
	})

})

describe(`replaceUnicodePropertyPattern`, () =>
{

	knownUnicodeProperty
		.concat(unknownUnicodeProperty)
		.forEach(source =>
		{
			let input = `xxxx${source}yyyy`;

			test(inspect(input), () =>
			{

				let actual = replaceUnicodePropertyPattern(input, (substring, p, name, value, any) => {
					return ''
				});

				let actual2 = replaceUnicodePropertyPattern(input, (substring, p, name, value, any) => {
					return `\\p{P}`
				});

				expect(actual).toStrictEqual(`xxxxyyyy`);

				expect(actual2).toStrictEqual(`xxxx\\p{P}yyyy`);

				expect(hasUnicodePropertyPattern(actual2)).toBeTruthy();

			})
		})
	;

})

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

				expect(actual.flags).toContain(EnumFlagMap.unicode);
				expect(actual.options).toHaveProperty('unicodePropertyEscape', true);

				expect(actual).toMatchSnapshot();
			})

		})

});

