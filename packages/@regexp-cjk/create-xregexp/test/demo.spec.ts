import XRegExp from 'xregexp';
import isXRegExp from '@regexp-cjk/is-xregexp';
import createXRegExp from '../index';

test(`createXRegExp`, () =>
{

	let actual = createXRegExp('a.b');

	expect(isXRegExp(actual)).toBeTruthy();
	expect(actual).toBeInstanceOf(RegExp);
	expect(actual).toMatchSnapshot();

});
