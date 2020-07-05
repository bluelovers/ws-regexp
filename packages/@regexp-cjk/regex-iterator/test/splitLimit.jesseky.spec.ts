import splitLimit, { ISplitLimitOptions } from '../lib/api/splitLimit';

const str = 'user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64';
const str2 = 'apple - pear  -  melon - banana';
const str3 = 'apple *-* pear  .+.  melon ^-^ banana';

describe('RegExp separator: ', function ()
{
	it('Split with RegExp correctly', function ()
	{
		expect(splitLimit(str, /:\s+/, -1)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
		expect(splitLimit(str, /:\s+/, 0)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
		expect(splitLimit(str, /:\s+/, 1)).toStrictEqual(['user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64']);
		expect(splitLimit(str, /:\s+/, 2)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS: Mac, Arch:  amd64']);
		expect(splitLimit(str, /:\s+/, 3)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch:  amd64']);
		expect(splitLimit(str, /:\s+/, 4)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
		expect(splitLimit(str, /:\s+/, 5)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
	});
});

describe('String separator: ', function ()
{
	it('Split with String correctly', function ()
	{
		expect(splitLimit(str, ': ', -1)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
		expect(splitLimit(str, ': ', 0)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
		expect(splitLimit(str, ': ', 1)).toStrictEqual(['user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64']);
		expect(splitLimit(str, ': ', 2)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS: Mac, Arch:  amd64']);
		expect(splitLimit(str, ': ', 3)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch:  amd64']);
		expect(splitLimit(str, ': ', 4)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
		expect(splitLimit(str, ': ', 5)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
	});
});

describe('separator with undefined or null: ', function ()
{
	it('separator with undefined or null correctly', function ()
	{
		expect(splitLimit(str, /:\s+/)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
		expect(splitLimit(str, /:\s+/, null)).toStrictEqual(['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
	});
});

// test with groups
describe('RegExp separator with groups but drop submatches: ', function ()
{
	it('Split with RegExp groups but drop submatches correctly', function ()
	{
		let options: ISplitLimitOptions = {
			excludeSubMatched: true,
		}

		expect(splitLimit(str2, /\s*(-)\s*/, -1, options)).toStrictEqual(['apple', 'pear', 'melon', 'banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 0, options)).toStrictEqual(['apple', 'pear', 'melon', 'banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 1, options)).toStrictEqual(['apple - pear  -  melon - banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 2, options)).toStrictEqual(['apple', 'pear  -  melon - banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 3, options)).toStrictEqual(['apple', 'pear', 'melon - banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 4, options)).toStrictEqual(['apple', 'pear', 'melon', 'banana']);
		expect(splitLimit(str2, /\s*(-)\s*/, 5, options)).toStrictEqual(['apple', 'pear', 'melon', 'banana']);
	});
});

describe('RegExp separator with groups and keep submatches: ', function ()
{
	const input = str2;

	const options: ISplitLimitOptions = {
		//isKeepSubmatches: true
	};

	const regex = /\s*(-)\s*/;

	it('Split with RegExp groups and keep submatches correctly', function ()
	{

		expect(splitLimit(input, regex, -1, options))
			.toStrictEqual(['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
		expect(splitLimit(input, regex, 0, options))
			.toStrictEqual(['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
		expect(splitLimit(input, regex, 1, options)).toStrictEqual(['apple - pear  -  melon - banana']);

	});

	describe(`limit`, () => {
		for (let limit = 2; limit <= 5; limit++)
		{
			it(`limit:${limit}`, function ()
			{
				expect(splitLimit(str3, regex, limit, options))
					.toMatchSnapshot();
			});
		}
	})

	it.skip('Split with RegExp groups and keep submatches correctly', function ()
	{
		expect(splitLimit(input, regex, 2, options)).toStrictEqual(['apple', '-', 'pear  -  melon - banana']);
		expect(splitLimit(input, regex, 3, options)).toStrictEqual(['apple', '-', 'pear', '-', 'melon - banana']);
		expect(splitLimit(input, regex, 4, options))
			.toStrictEqual(['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
		expect(splitLimit(input, regex, 5, options))
			.toStrictEqual(['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
	});

});

describe('RegExp separator contains multiple groups and keep submatches: ', function ()
{
	const input = str3;

	const options: ISplitLimitOptions = {
		//isKeepSubmatches: true
	};

	const regex = /\s*([^-+])([-+])([^-+])\s*/;

	it('Split with RegExp contains multiple groups and keep submatches correctly', function ()
	{
		expect(splitLimit(input, regex, -1, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
		expect(splitLimit(input, regex, 0, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
		expect(splitLimit(input, regex, 1, options))
			.toStrictEqual(['apple *-* pear  .+.  melon ^-^ banana']);
	})

	describe(`limit`, () => {
		for (let limit = 2; limit <= 5; limit++)
		{
			it(`limit:${limit}`, function ()
			{
				expect(splitLimit(input, regex, limit, options))
					.toMatchSnapshot();
			});
		}
	})

	it.skip('Split with RegExp contains multiple groups and keep submatches correctly', function ()
	{
		expect(splitLimit(input, regex, 2, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear  .+.  melon ^-^ banana']);
		expect(splitLimit(input, regex, 3, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon ^-^ banana']);
		expect(splitLimit(input, regex, 4, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
		expect(splitLimit(input, regex, 5, options))
			.toStrictEqual(['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
	});
});

