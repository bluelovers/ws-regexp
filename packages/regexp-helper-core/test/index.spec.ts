import { toUnicode, surrogatePair, toHex, unicodeUnEscape } from '../index';

describe(`𠮷`, () =>
{
	const c = '𠮷';

	[
		c,
		toUnicode(c),
		toUnicode(c, true),
	].forEach(function (s)
	{
		const r = new RegExp(`^[${s}]$`, 'u');

		test(r.toString(), function ()
		{
			expect(r.test(c)).toBeTruthy();
			expect(r).toMatchSnapshot();
		});
	});

	test(`codePointAt`, () =>
	{

		let actual = c.codePointAt(0);
		let expected = 0x20bb7;

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`toUnicode`, () =>
	{

		let actual = toUnicode(c.codePointAt(0));
		let expected = '\\u{20bb7}';

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`surrogatePair`, () =>
	{

		let actual = surrogatePair(c.codePointAt(0));
		let expected = '\\u{20bb7}';

		let c0 = c.charCodeAt(0);
		let c1 = c.charCodeAt(1);

		expect(actual[0]).toStrictEqual(c0);
		expect(actual[1]).toStrictEqual(c1);

		expect(actual.h).toStrictEqual(c0);
		expect(actual.l).toStrictEqual(c1);

		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

		expect(toHex(actual[0])).toStrictEqual('d842');
		expect(toHex(actual[1])).toStrictEqual('dfb7');

	});

})

describe(`unicodeUnEscape`, () =>
{
	test(`\\u{20bb7} => 𠮷`, async function ()
	{
		expect(unicodeUnEscape('\\u{20bb7}')).toStrictEqual('𠮷');
		expect(unicodeUnEscape(toUnicode('𠮷'))).toStrictEqual('𠮷');
		expect('\u{20bb7}').toStrictEqual('𠮷');
	});

	test(`Hello world`, async function ()
	{
		expect(unicodeUnEscape('\\u{48}\\u{65}\\u{6c}\\u{6c}\\u{6f}\\u{20}\\u{77}\\u{6f}\\u{72}\\u{6c}\\u{64}')).toStrictEqual('Hello world');
	});
});
