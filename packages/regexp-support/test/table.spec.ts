

import { array_unique_overwrite } from 'array-hyper-unique';
import { UNICODE_ALL, wrapToRegexName } from '../lib/pattern/charset/unicode';
import { UNICODE_SCRIPTS_ALL } from '../lib/pattern/charset/unicode-script';

const testChars = [

	'「',
	'…',
	'※',

	'？',
	'Ｖ',
	'５',

	//'!',

	'👧👧👧🏻',
	'🏽',

	'😀',

	'カタカナ',

	...('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')),

	'ማንዣበቢያ',
	'আমার',
	'ხომალდი',
	'летачко',
	'cánh',
	'中文字符',

	'لمو',

	"\n", ".", "\t", "\r", "\f",
	" ", "-", "!", "»", "›", "‹", "«",
	"ͳ", "Θ", "Σ", "Ϫ", "Ж", "ؤ",
	"༬", "༺", "༼", "ང", "⃓", "✄",
	"⟪", "や", "゙",
	"+", "→", "∑", "∢", "※", "⁉", "⧓", "⧻",
	"⑪", "⒄", "⒰", "ⓛ", "⓶",
	"\u0300" /* COMBINING GRAVE ACCENT, Mn */,
	"\u0BCD" /* TAMIL SIGN VIRAMA, Me */,
	"\u20DD" /* COMBINING ENCLOSING CIRCLE, Me */,
	"\u2166" /* ROMAN NUMERAL SEVEN, Nl */,

	"ā", "ň",

	"ऄ",
	"༁",

	"Ḁ",

	"⁰",

	"▀",
	"─",
	"■",
	"☀",

	"⟵",

];

array_unique_overwrite(testChars);

testChars.sort();

describe(`UNICODE_ALL`, () =>
{

	setupTest(UNICODE_ALL)

})

describe(`UNICODE_SCRIPTS_ALL`, () =>
{

	setupTest(UNICODE_SCRIPTS_ALL)

})

function setupTest<T extends Record<string, boolean>>(table: T)
{
	const keys = Object.keys(UNICODE_ALL)

	testChars
		.forEach(char => {

			let title = char;

			if (["\n", "\t", "\r", "\f", '🏽', " ", '\u00a0'].includes(title))
			{
				title = '\\u' + toHex(title.codePointAt(0))
			}

			test(title, () => {

				console.log(title, char, char.codePointAt(0), char.length)

				let map: (keyof T)[] = [];

				keys.forEach(name => {

					let r: RegExp;
					let r2: RegExp;

					try
					{
						let k = wrapToRegexName(name);
						r = new RegExp(`^${k}+$`, 'u');

						k = wrapToRegexName(name, true);
						r2 = new RegExp(`^${k}+$`, 'u');
					}
					catch (e)
					{
						return;
					}

					let bool = r.test(char)

					if (bool && bool !== r2.test(char))
					{
						map.push(name)
					}

				});

				map.sort()

				console.log(map)

				expect({
					char,
					map,
				}).toMatchSnapshot()

			})

		})
	;
}

function toHex(n: number)
{
	return n.toString(16).padStart(4, '0')
}
