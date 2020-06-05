import regexpClassToObject from '../index';

test(`regexpClassToObject`, () =>
{

	let actual = regexpClassToObject(/[\u200b-\u200f\ufeff\u2060]/ug)
		.remove(0x200d);

	let re = actual.toRegExp();

	expect(re).toBeInstanceOf(RegExp);

	expect(actual).toMatchSnapshot();
	expect(re).toMatchSnapshot();

});

