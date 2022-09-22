import { matchRange } from '../src';

describe('default', (): void =>
{

	it('⓪ ~ ㊿', () =>
	{
		let actual = matchRange('⓪', '㊿');

		expect(actual).toHaveLength(51);
		expect(actual).toMatchSnapshot()

	});

	it('一 ~ 十', () =>
	{
		let actual = matchRange('一', '十');

		expect(actual).toHaveLength(10);
		expect(actual).toMatchSnapshot()
	});

	it('零 ~ 拾', () =>
	{
		let actual = matchRange('零', '拾');

		expect(actual).toHaveLength(17);
		expect(actual).toMatchSnapshot()
	});

	it('二 ~ 七', () =>
	{
		let actual = matchRange('二', '七');

		expect(actual).toHaveLength(6);
		expect(actual).toMatchSnapshot()
	});

	it('二 ~ 七 createRegExpString', () =>
	{
		let actual = matchRange('二', '七', {
			createRegExpString: true,
		});

		expect(actual).toHaveLength(6);
		expect(actual).toMatchSnapshot()
	});

	it('二 ~ 七 createRegExpClass', () =>
	{
		let actual = matchRange('二', '七', {
			createRegExpString: true,
			createRegExpClass: true,
		});

		expect(actual).toMatchSnapshot()
	});

	it('壹 ~ 什', () =>
	{
		let actual = matchRange('壹', '什', {
			createRegExpString: true,
		});

		expect(actual).toMatchSnapshot()
	});

	it('壹 ~ 什 createRegExpClass findFirstOne', () =>
	{
		let actual = matchRange('壹', '什', {
			createRegExpString: true,
			findFirstOne: true,
		});

		expect(actual).toMatchSnapshot()
	});

	it('三 ~ 五 createRegExpClass', () =>
	{
		let actual = matchRange('三', '五', {
			createRegExpString: true,
		});

		expect(actual).toMatchSnapshot()
	});

});
