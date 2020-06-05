import novelPatternSplit, { INovelPatternSplitOptions } from '../core';

describe(`novelPatternSplit`, () =>
{
	const tests = [
		[
			[`(女佣|女僕)`], [
			'(女佣|女僕)',
		],
		],
		[
			[`女佣|女僕`], [
			'女佣', '女僕',
		],
		],
		[
			[`(?:女佣|女僕)`], [
			'女佣', '女僕',
		],
		],
		[
			[new RegExp(`(女佣|女僕)`)], [
			'(女佣|女僕)',
		],
		],
		[
			[new RegExp(`女佣|女僕`)], [
			'女佣', '女僕',
		],
		],
		[
			[new RegExp(`(?:女佣|女僕)`)], [
			'女佣', '女僕',
		],
		],
	] as [[string, ...any[]], string[]][];

	tests.forEach(function (testcase)
	{
		test(String(testcase[0][0]), () =>
		{

			let actual = novelPatternSplit(...testcase[0]);
			let expected = testcase[1];

			expect(actual).toStrictEqual(expected);
			//expect(actual).toBeInstanceOf(Date);
			expect(actual).toMatchSnapshot();

		});
	})

})


describe(`breakingMode: true`, () =>
{
	const _options: INovelPatternSplitOptions = {
		breakingMode: true,
	};

	let tests = [
		[
			[`(女佣|女僕)`, _options], [
			'女佣', '女僕'
		],
		],
		[
			[`女佣|女僕`, _options], [
			'女佣', '女僕'
		],
		],
		[
			[`(?:女佣|女僕)`, _options], [
			'女佣', '女僕'
		],
		],
		[
			[new RegExp(`(女佣|女僕)`), _options], [
			'女佣', '女僕'
		],
		],
		[
			[new RegExp(`女佣|女僕`), _options], [
			'女佣', '女僕'
		],
		],
		[
			[new RegExp(`(?:女佣|女僕)`), _options], [
			'女佣', '女僕'
		],
		],
		[
			[/(?<![ァ-ヴーｱ-ﾝﾞｰ])(ソフィア|索菲亞)(?![ァ-ヴーｱ-ﾝﾞｰ])/, _options], [
			'ソフィア', '索菲亞'
		],
		],
		[
			[new RegExp(`(?<![ァ-ヴーｱ-ﾝﾞｰ])(震夜)(?![ァ-ヴーｱ-ﾝﾞｰ])`), _options], [
			'震夜'
		],
		],
	] as [[string, ...any[]], string[]][];

	tests.forEach(function (testcase)
	{
		test(String(testcase[0][0]), () =>
		{

			let actual = novelPatternSplit(...testcase[0]);
			let expected = testcase[1];

			expect(actual).toStrictEqual(expected);
			//expect(actual).toBeInstanceOf(Date);
			expect(actual).toMatchSnapshot();

		});
	})

})
