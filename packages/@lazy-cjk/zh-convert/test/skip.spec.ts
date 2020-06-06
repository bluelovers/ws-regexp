import { cn2tw, tw2cn } from '../index';

describe(`skip`, () =>
{
	const input = '简繁转换功能测试簡繁轉換功能測試';
	const skip = '转换轉換';

	test(`cn2tw`, () =>
	{

		let actual = cn2tw(input, {
			skip,
		});

		expect(actual).not.toStrictEqual(input);

		skip
			.split('')
			.forEach(c => expect(actual).toContain(c))
		;

		expect(actual).toMatchSnapshot();

	});

	test(`tw2cn`, () =>
	{

		let actual = tw2cn(input, {
			skip,
		});

		expect(actual).not.toStrictEqual(input);

		skip
			.split('')
			.forEach(c => expect(actual).toContain(c))
		;

		expect(actual).toMatchSnapshot();

	});

})
