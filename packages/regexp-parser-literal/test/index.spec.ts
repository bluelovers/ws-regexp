import { parsePattern, parseFlags, parseRegExp } from '../index';

test(`parsePattern`, () =>
{

	let actual = parsePattern(/麻#_@_#痹/.source);
	let expected = `麻#_@_#痹`;

	expect(actual.raw).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`parseFlags`, () =>
{

	let actual = parseFlags('ygmisu');

	expect(actual).toMatchSnapshot();

});

test(`parseRegExp`, () =>
{

	let actual = parseRegExp(/麻#_@_#痹/u.toString());

	expect(actual).toMatchSnapshot();

});
