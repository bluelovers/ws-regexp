import splitLimit from '../lib/api/splitLimit';

test(`splitLimit`, () =>
{

	let actual = splitLimit('kkabbcccccccccccfff', /(\w)\1/, 4);

	console.dir(actual)

	expect(actual.includes('')).toBeFalsy()
	expect(actual.length).toBeLessThanOrEqual(4);

});

test(`actual.join will same as source text`, () =>
{
	let input = 'kkabbcccccccccccfff';
	let limit = 6;

	let actual = splitLimit(input, /(.)/, limit);

	checkLimit(actual, limit);

	expect(actual.join('')).toStrictEqual(input);

	actual = splitLimit(input, /(.{2})/, limit);

	checkLimit(actual, limit);

	expect(actual.join('')).toStrictEqual(input);

	actual = splitLimit(input, /(.{3})/, limit);

	expect(actual.join('')).toStrictEqual(input);

	checkLimit(actual, limit);

	actual = splitLimit(input, /(.{4})/, limit);

	expect(actual.join('')).toStrictEqual(input);

	checkLimit(actual, limit);

});

test(`same as string.split`, () =>
{
	let input = 'kkabbcccccccccccfff';
	let re = /(\w{2})/;

	let actual = splitLimit(input, re);
	let expected = input.split(re).filter(s => s !== '');

	expect(actual.includes('')).toBeFalsy()
	expect(actual).toStrictEqual(expected);
	expect(actual).toMatchSnapshot();

	actual = splitLimit(input, re, void 0, {
		allowEmpty: true,
	});
	expected = input.split(re);

	expect(actual).toStrictEqual(expected);
	expect(actual).toMatchSnapshot();

});

function checkLimit(actual: string[], limit: number)
{
	expect(actual.includes('')).toBeFalsy()
	expect(actual.length).toBeLessThanOrEqual(limit);
	expect(actual).toMatchSnapshot();
}
