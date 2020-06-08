import _zhRegExp from 'regexp-cjk';
import createZhRegExpCorePlugin from '../index';

let zhRegExp: typeof _zhRegExp = _zhRegExp.use({
	flags: 'u',
	onCore: [
		createZhRegExpCorePlugin({
			/**
			 * just do it
			 */
			//escapeAll: true,
			/**
			 * auto detect do or not
			 * @default true
			 */
			escapeAuto: true,
		}),
	],
});

test(`[中文\\p{Punctuation}]`, () =>
{

	let actual = new zhRegExp(`[中文\\p{Punctuation}]`);

	expect('中').toMatch(actual);
	expect('文').toMatch(actual);
	expect(',').toMatch(actual);
	expect('，').toMatch(actual);
	expect('p').not.toMatch(actual);
	expect('P').not.toMatch(actual);

	expect(actual).toMatchSnapshot();

});

