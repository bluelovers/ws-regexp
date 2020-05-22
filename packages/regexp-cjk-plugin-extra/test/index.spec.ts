import zhRegExp from 'regexp-cjk';
import createZhRegExpPlugin, { IZhRegExpPluginOptions } from '../index';

const allOptions: IZhRegExpPluginOptions = Object.freeze({
	autoDeburr: true,
	autoFullHaif: true,
	autoLocale: true,
	autoVoice: true,
});

describe(`base`, () => {

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
		test(title, function ()
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

			//console.dir(actual);

			expect(expected).toMatch(actual);
			expect(expected).not.toEqual(source);
			expect(actual.source).not.toEqual(source);

			expect(actual).toMatchSnapshot();
		});
	}

});

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

		{
			title: null,
			input: /／/ui,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: /　/ui,
			expected: `[ 　]`,
		},
		{
			title: null,
			input: /（/ui,
			expected: `[(（]`,
		},
		{
			title: null,
			input: /）/ui,
			expected: `[)）]`,
		},
		{
			title: null,
			input: /［/ui,
			expected: `[\\[［]`,
		},
		{
			title: null,
			input: /］/ui,
			expected: `[\\]］]`,
		},
		{
			title: null,
			input: /？/ui,
			expected: `[?？]`,
		},
		{
			title: null,
			input: /／/ui,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: /＼/ui,
			expected: `[\\\\＼]`,
		},
		{
			title: null,
			input: /．/ui,
			expected: `[.．]`,
		},
		{
			title: null,
			input: /－/ui,
			expected: `[\\-－]`,
		},
		{
			title: null,
			input: /－/i,
			expected: `[\\-－]`,
		},
		{
			title: null,
			input: /＋/ui,
			expected: `[+＋]`,
		},
		{
			title: null,
			input: /＊/ui,
			expected: `[*＊]`,
		},

		// -----------------

		{
			title: null,
			input: /\//i,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: / /i,
			expected: `[ 　]`,
		},
		{
			title: null,
			input: /\(/i,
			expected: `[(（]`,
		},
		{
			title: null,
			input: /\)/i,
			expected: `[)）]`,
		},
		{
			title: null,
			input: /\[/i,
			expected: `[\\[［]`,
		},
		{
			title: null,
			input: /\]/i,
			expected: `[\\]］]`,
		},
		{
			title: null,
			input: /\?/i,
			expected: `[?？]`,
		},
		{
			title: null,
			input: /\//i,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: /\\/i,
			expected: `[\\\\＼]`,
		},
		{
			title: null,
			input: /\./i,
			expected: `[.．]`,
		},
		{
			title: null,
			input: /-/i,
			expected: `[\\-－]`,
		},
		{
			title: null,
			input: /\-/i,
			expected: `[\\-－]`,
		},
		{
			title: null,
			input: /\+/i,
			expected: `[+＋]`,
		},
		{
			title: null,
			input: /\*/i,
			expected: `[*＊]`,
		},

		{
			title: null,
			input: /／/i,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: /　/i,
			expected: `[ 　]`,
		},
		{
			title: null,
			input: /（/i,
			expected: `[(（]`,
		},
		{
			title: null,
			input: /）/i,
			expected: `[)）]`,
		},
		{
			title: null,
			input: /［/i,
			expected: `[\\[［]`,
		},
		{
			title: null,
			input: /］/i,
			expected: `[\\]］]`,
		},
		{
			title: null,
			input: /？/i,
			expected: `[?？]`,
		},
		{
			title: null,
			input: /／/i,
			expected: `[\\/／]`,
		},
		{
			title: null,
			input: /＼/i,
			expected: `[\\\\＼]`,
		},
		{
			title: null,
			input: /．/i,
			expected: `[.．]`,
		},
		{
			title: null,
			input: /－/i,
			expected: `[\\-－]`,
		},
		{
			title: null,
			input: /＋/i,
			expected: `[+＋]`,
		},
		{
			title: null,
			input: /＊/i,
			expected: `[*＊]`,
		},

	].forEach(conf => {

		let { title, input, expected } = conf;

		test(String(title || input), () => {

			let source = input.source;

			let actual = new zhRegExp(input, {
				on: [
					createZhRegExpPlugin(allOptions)
				],
			});

			expect(actual.source).not.toEqual(source);
			expect(actual.source).toEqual(expected);

			expect(actual).toMatchSnapshot();

		});

	});

})
