/**
 * Created by user on 2019/5/28.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';
import zhRegExp, { IOptions } from 'regexp-cjk';
import createZhRegExpPlugin, { IZhRegExpPluginOptions } from '../index';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: Mocha.Test;

	let allOptions: IZhRegExpPluginOptions = Object.freeze({
		autoDeburr: true,
		autoFullHaif: true,
		autoLocale: true,
		autoVoice: true,
	});

	beforeEach(function ()
	{
		currentTest = this.currentTest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`suite`, () =>
	{

		([
			{
				title: `autoFullHaif a / Ａ`,
				word: /a/ui,
				word_match: `Ａ`,
				options: {
					autoFullHaif: true,
				}
			},
			{
				title: `autoFullHaif Ａ / a`,
				word: /Ａ/ui,
				word_match: `a`,
				options: {
					autoFullHaif: true,
				}
			},
			{
				title: `autoFullHaif <haif width space> / <full width space>>`,
				word: / /ui,
				word_match: `　`,
				options: {
					autoFullHaif: true,
				}
			},
			{
				title: `autoVoice か / が`,
				word: /か/ui,
				word_match: `が`,
				options: {
					autoVoice: true,
				}
			},
			{
				title: `autoVoice ヘ / ペ`,
				word: /ヘ/ui,
				word_match: `ペ`,
				options: {
					autoVoice: true,
				}
			},
			{
				title: `autoDeburr déjà vu / deja vu`,
				word: /déjà vu/ui,
				word_match: `deja vu`,
				options: {
					autoDeburr: true,
				}
			},
		] as (Parameters<typeof _simpleTest001>)["0"][]).forEach(conf => _simpleTest001(conf));

		function _simpleTest001(conf: {
			title: string,
			word: RegExp | string,
			word_match: string,
			options: IZhRegExpPluginOptions,
		})
		{
			let { title, word_match, word, options } = conf;

			// @ts-ignore
			it(title, function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let re: RegExp;

				if (typeof word === 'string')
				{
					re = new RegExp(word, 'iu');
				}
				else
				{
					re = word;
				}

				const source = re.source;
				const flags = re.flags;

				let actual = new zhRegExp(re, {
					on: [
						createZhRegExpPlugin(options)
					],
				});
				let expected = word_match;

				console.dir(actual);

				expect(expected).to.match(actual);
				expect(expected).to.not.equal(source);
				expect(actual.source).to.not.equal(source);
			});
		}

	});

	// @ts-ignore
	describe(`escape`, () =>
	{

		[
			{
				title: null,
				input: /\//ui,
				expected: `[\\/／]`,
			},
			{
				title: null,
				input: / /ui,
				expected: `[ 　]`,
			},
			{
				title: null,
				input: /\(/ui,
				expected: `[(（]`,
			},
			{
				title: null,
				input: /\)/ui,
				expected: `[)）]`,
			},
			{
				title: null,
				input: /\[/ui,
				expected: `[\\[［]`,
			},
			{
				title: null,
				input: /\]/ui,
				expected: `[\\]］]`,
			},
			{
				title: null,
				input: /\?/ui,
				expected: `[?？]`,
			},
			{
				title: null,
				input: /\//ui,
				expected: `[\\/／]`,
			},
			{
				title: null,
				input: /\\/ui,
				expected: `[\\\\＼]`,
			},
			{
				title: null,
				input: /\./ui,
				expected: `[.．]`,
			},
			{
				title: null,
				input: /-/ui,
				expected: `[\\-－]`,
			},
			{
				title: null,
				input: /\-/i,
				expected: `[\\-－]`,
			},
			{
				title: null,
				input: /\+/ui,
				expected: `[+＋]`,
			},
			{
				title: null,
				input: /\*/ui,
				expected: `[*＊]`,
			},
			{
				title: null,
				input: / déjà =<>\(\)\[\] \\ \/\?\.-\+\*vu[\-]/ui,
				expected: `[ 　][dｄ][eé][jｊ][aà][ 　][=＝][<＜][>＞][(（][)）][\\[［][\\]］][ 　][\\\\＼][ 　][\\/／][?？][.．][\\-－][+＋][*＊][vｖ][uｕ][\\-]`,
			},
		].forEach(conf => {

			let { title, input, expected } = conf;

			it(String(title || input), () => {

				let source = input.source;

				let actual = new zhRegExp(input, {
					on: [
						createZhRegExpPlugin(allOptions)
					],
				});

				console.dir(actual);

				expect(actual.source).to.not.equal(source);
				expect(actual.source).to.equal(expected);

			});

		});

	});
});
