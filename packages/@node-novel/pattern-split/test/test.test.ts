/**
 * Created by user on 2018/9/1/001.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { INovelPatternSplitOptions } from '../index';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

import novelPatternSplit = require('../');

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	// @ts-ignore
	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`default`, () =>
	{
		let tests = [
			[
				[`(女佣|女僕)`], [
				'(女佣|女僕)',
			],
			],
			[
				[`女佣|女僕`], [
				'女佣', '女僕'
			],
			],
			[
				[`(?:女佣|女僕)`], [
				'女佣', '女僕'
			],
			],
			[
				[new RegExp(`(女佣|女僕)`)], [
				'(女佣|女僕)',
			],
			],
			[
				[new RegExp(`女佣|女僕`)], [
				'女佣', '女僕'
			],
			],
			[
				[new RegExp(`(?:女佣|女僕)`)], [
				'女佣', '女僕'
			],
			],
		];

		tests.forEach(function (testcase)
		{
			// @ts-ignore
			it(String(testcase[0][0]), function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				// @ts-ignore
				let actual = novelPatternSplit(...testcase[0]);
				let expected = testcase[1];

				expect(actual).to.be.ok;
				expect(actual).to.be.deep.equal(expected);
				//assert.isOk(actual.value, util.inspect(actual));
			});
		});
	});

	// @ts-ignore
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
		];

		tests.forEach(function (testcase)
		{
			// @ts-ignore
			it(String(testcase[0][0]), function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				// @ts-ignore
				let actual = novelPatternSplit(...testcase[0]);
				let expected = testcase[1];

				expect(actual).to.be.ok;
				expect(actual).to.be.deep.equal(expected);
				//assert.isOk(actual.value, util.inspect(actual));
			});
		});
	});
});
