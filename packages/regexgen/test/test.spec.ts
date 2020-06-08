import regexgen from '../';

describe('regexgen', () =>
{
	it('should generate a char class', () =>
	{
		expect(regexgen(['a', 'b', 'c'])).toEqual(/[a-c]/);
	});

	it('should generate an alternation', () =>
	{
		expect(regexgen(['abc', '123'])).toEqual(/123|abc/);
	});

	it('should extract common prefixes at the start', () =>
	{
		expect(regexgen(['foobar', 'foozap'])).toEqual(/foo(?:zap|bar)/);
	});

	it('should extract common prefixes at the end', () =>
	{
		expect(regexgen(['barfoo', 'zapfoo'])).toEqual(/(?:zap|bar)foo/);
	});

	it('should extract common prefixes at the start and end', () =>
	{
		expect(regexgen(['foobarfoo', 'foozapfoo'])).toEqual(/foo(?:zap|bar)foo/);
	});

	it('should generate an optional group', () =>
	{
		expect(regexgen(['foo', 'foobar'])).toEqual(/foo(?:bar)?/);
	});

	it('should generate multiple optional groups', () =>
	{
		expect(regexgen(['f', 'fo', 'fox'])).toEqual(/f(?:ox?)?/);
	});

	it('should escape meta characters', () =>
	{
		expect(regexgen(['foo|bar[test]+'])).toEqual(/foo\|bar\[test\]\+/);
		expect(regexgen(['u{}\\iu'])).toEqual(/u\{\}\\iu/);
	});

	it('should escape non-ascii characters', () =>
	{
		expect(regexgen(['🎉'])).toEqual(/\uD83C\uDF89/);
	});

	it('should support regex flags', () =>
	{
		expect(regexgen(['a', 'b', 'c'], 'g')).toEqual(/[a-c]/g);
	});

	it('should support using the Trie class directly', () =>
	{
		let t = new regexgen.Trie;
		t.add('foobar');
		t.add('foobaz');

		expect(t.toString()).toEqual('fooba[rz]');
		expect(t.toRegExp()).toEqual(/fooba[rz]/);

		let t2 = new regexgen.Trie;
		t2.addAll(['foobar', 'foobaz']);

		expect(t2.toString()).toEqual('fooba[rz]');
		expect(t2.toRegExp()).toEqual(/fooba[rz]/);
	});

	it('should work with optional groups', () =>
	{
		expect(regexgen(['a', 'abc'])).toEqual(/a(?:bc)?/);
	});

	it(
		'should wrap optional character classes in parens if they contain non-BMP codepoints',
		() =>
		{
			expect(regexgen(['\u261D', '\u261D\u{1f3fb}', '\u261D\u{1f3fc}'])).toEqual(/\u261D(?:\uD83C[\uDFFB\uDFFC])?/);
		},
	);

	it(
		'should wrap optional literals in parens if they contain more than one code unit',
		() =>
		{
			expect(regexgen(['\u261D', '\u261D\u{1f3fb}'])).toEqual(/\u261D(?:\uD83C\uDFFB)?/);
		},
	);

	it(
		'should retain non-BMP codepoints when the Unicode flag is passed',
		() =>
		{
			expect(regexgen(['\u261D', '\u261D\u{1f3fb}'], 'u')).toEqual(/\u261D\u{1F3FB}?/u);
			expect(
				regexgen([
					'\u{1F3F4}',
					'\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}',
					'\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}',
					'\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}',
				], 'u'),
			).toEqual(
				/\u{1F3F4}(?:\u{E0067}\u{E0062}(?:\u{E0073}\u{E0063}\u{E0074}|\u{E0077}\u{E006C}\u{E0073}|\u{E0065}\u{E006E}\u{E0067}))?/u,
			);
		},
	);

	it('should handle non-BMP codepoint ranges correctly', () =>
	{
		expect(
			regexgen([
				'\u{1F311}',
				'\u{1F312}',
				'\u{1F313}',
				'\u{1F314}',
				'\u{1F315}',
				'\u{1F316}',
				'\u{1F317}',
				'\u{1F318}',
			], 'u'),
		).toEqual(/[\u{1F311}-\u{1F318}]/u);
	});

	it(
		'should correctly extract common prefix from multiple alternations',
		() =>
		{
			expect(regexgen(['abjv', 'abxcjv', 'abydjv', 'abzejv'])).toEqual(/ab(?:ze|yd|xc)?jv/);
		},
	);

	it('should sort alternation options correctly (#10)', () =>
	{
		let s = '\uD83C\uDFCA\uD83C\uDFFD\u200D\u2640\uFE0F';
		let r = regexgen([
			'\uD83C\uDDF7\uD83C\uDDFC',
			'\uD83C\uDDF8\uD83C\uDDE6',
			'\uD83C\uDFCA\uD83C\uDFFD',
			s,
		]);

		expect(s.match(r)[0]).toEqual(s);
	});

	it('should sort non-BMP alternation options correctly', () =>
	{
		let r = regexgen(
			[
				// shrug emoji
				'\u{1F937}\u200D',
				// shrug emoji with fitzpatrick modifiers
				'\u{1F937}\u{1F3FB}\u200D',
				'\u{1F937}\u{1F3FC}\u200D',
				'\u{1F937}\u{1F3FD}\u200D',
				'\u{1F937}\u{1F3FE}\u200D',
				'\u{1F937}\u{1F3FF}\u200D',
				// shrug emoji with gender modifier
				'\u{1F937}\u200D\u2640\uFE0F',
				// shrug emoji with gender and fitzpatrick modifiers
				'\u{1F937}\u{1F3FB}\u200D\u2640\uFE0F',
				'\u{1F937}\u{1F3FC}\u200D\u2640\uFE0F',
				'\u{1F937}\u{1F3FD}\u200D\u2640\uFE0F',
				'\u{1F937}\u{1F3FE}\u200D\u2640\uFE0F',
				'\u{1F937}\u{1F3FF}\u200D\u2640\uFE0F',
			],
			'u',
		);

		expect(r).toEqual(/\u{1F937}[\u{1F3FB}-\u{1F3FF}]?\u200D(?:\u2640\uFE0F)?/u);
		expect('\u{1F937}\u{1F3FB}\u200D\u2640\uFE0F'.match(r)[0]).toEqual('\u{1F937}\u{1F3FB}\u200D\u2640\uFE0F');
	});

	it('should sort alternations of alternations correctly', () =>
	{
		let r = regexgen(['aef', 'aghz', 'ayz', 'abcdz', 'abcd']);
		let s = 'abcdz';

		expect(s.match(r)[0]).toEqual(s);
		expect(r).toEqual(/a(?:(?:bcd|gh|y)z|bcd|ef)/);
	});
});
