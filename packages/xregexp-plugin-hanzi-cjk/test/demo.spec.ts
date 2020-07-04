import XRegExp from 'xregexp';
import addSupportToXRegExp, { isInstalled } from '../index';

test(`demo`, () =>
{

	let actual = addSupportToXRegExp();
	let expected = XRegExp;

	console.dir(actual);

	expect(actual).toStrictEqual(expected);
	expect(isInstalled(XRegExp)).toBeTruthy();

	let source = '(の|像)';

	let actual2 = XRegExp(source)

	console.dir(actual2);

	expect(actual2.source).not.toStrictEqual(source)

	expect(actual2.source).toMatch(/^\(\[.+\]\)$/)

	expect('象').toMatch(actual2)
	expect('的').toMatch(actual2)

});

