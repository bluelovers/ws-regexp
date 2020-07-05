import map from '../lib/api/map';
import each from '../lib/api/each';
import reduce from '../lib/api/reduce';
import { replaceEach } from '../lib/api/replaceEach';

const re = /\S/g;
const input = 'ka kk'

test(`map`, () =>
{

	let actual = map(input, re);

	expect(actual).toHaveLength(4);
	expect(actual).toMatchSnapshot();

});

test(`map only once`, () =>
{

	let actual = map(input, /\S/);

	expect(actual).toHaveLength(1);
	expect(actual).toMatchSnapshot();

});

test(`each`, () =>
{
	expect.assertions(5)

	let actual = each(input, re, (m) =>
	{
		expect(m).toHaveLength(1);
	});

	expect(actual).toBeUndefined();

});

test(`each only once`, () =>
{

	expect.assertions(2)

	let actual = each(input, /\S/, (m) =>
	{
		expect(m).toHaveLength(1);
	});

	expect(actual).toBeUndefined();

});

test(`reduce`, () =>
{

	let html = '<a href="http://xregexp.com/api/">XRegExp</a>\
        <a href="http://www.google.com/">Google</a>';

	let actual = reduce(html, [
		{ regexp: /<a href="([^"]+)">/ig, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'domain' },
	])

	expect(actual).toStrictEqual(['xregexp.com', 'www.google.com']);

});

test(`reduce:throw`, () =>
{

	let html = '<a href="http://xregexp.com/api/">XRegExp</a>\
        <a href="http://www.google.com/">Google</a>';

	expect(() => reduce(html, [
		{ regexp: /<a href="([^"]+)">/ig, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'do' },
	])).toThrowErrorMatchingSnapshot()

});

test(`reduce:allowFallbackToSource`, () =>
{

	let html = '<a href="xregexp.com/api/">XRegExp</a>\
        <a href="http://www.google.com/">Google</a>';

	let actual = reduce(html, [
		{ regexp: /<a href="([^"]+)">/ig, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'domain' },
	], {
		allowFallbackToSource: true,
	})

	expect(actual).toStrictEqual(['xregexp.com/api/', 'www.google.com']);

	actual = reduce(html, [
		{ regexp: /<a href="([^"]+)">/ig, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'domain' },
	])

	expect(actual).toStrictEqual([void 0, 'www.google.com']);

});

test(`reduce only once`, () =>
{

	let html = '<a href="http://xregexp.com/api/">XRegExp</a>\
        <a href="http://www.google.com/">Google</a>';

	let actual = reduce(html, [
		{ regexp: /<a href="([^"]+)">/i, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'domain' },
	])

	expect(actual).toStrictEqual(['xregexp.com']);

});

test(`replaceEach`, () =>
{

	let actual = replaceEach('ka', [
		[/./g, 'u'],
		[/./, 'x'],
		{
			regexp: /u/,
			replaceValue: (s) => s + '777',
		}
	]);

	expect(actual).toStrictEqual('xu777');

});
