import XRegExp from 'xregexp';
import isXRegExp, { internalXRegExpData } from '../index';

test(`isXRegExp`, () =>
{

	let actual = XRegExp('a.b');

	expect(isXRegExp(actual)).toBeTruthy();
	expect(actual).toBeInstanceOf(RegExp);
	expect(actual).toMatchSnapshot();

});

test(`internalXRegExpData`, () =>
{

	let actual = XRegExp('a.b');

	expect(internalXRegExpData(actual)).toHaveProperty('source', 'a.b');
	expect(internalXRegExpData(actual)).toMatchSnapshot();

});
