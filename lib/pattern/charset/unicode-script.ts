/**
 * Created by user on 2018/5/6/006.
 */

import CACHE_PROPERTY_DATA from '../cache/property-data';
import { ICreateRegExp, ITypeCreateRegExp } from '../../index';
import { IPatternTestFn, IPatternTestRow, PatternSupport, testPattern } from '../../pattern';
import { _createFnTestPattern, log_dir } from '../../util/index';
import { _wrapToRegexName } from './index';

import CACHE_BLOCKS from '../cache/blocks';
import CACHE_CATEGORIES from '../cache/categories';
import CACHE_PROPERTIES from '../cache/properties';
import CACHE_SCRIPTS from '../cache/scripts';

export const KEY_PREFIX = '\\p{Script=';
export const KEY_PREFIX_NEGATION = '\\P{Script=';
export const KEY_SUFFIX = '}';

/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
export const UNICODE_SCRIPTS = {

	Greek: false,
	Latin: false,

	Katakana: false,
	Hiragana: false,

	Han: false,
	Hangul: false,

};

export const UNICODE_SCRIPTS_ALL = {
	...CACHE_SCRIPTS,

	...CACHE_PROPERTY_DATA.Script,

	...UNICODE_SCRIPTS,
};

export enum UNICODE_SCRIPTS_NAME_ALIAS
{
	Arabic = 'Arab',
	Bengali = 'Beng',
	Coptic = 'Copt',
	Cyrillic = 'Cyrl',

	Ethiopic = 'Ethi',
	Georgian = 'Geor',
	Greek = 'Grek',
	Han = 'Hani',

	Katakana = 'Kana',
	Hiragana = 'Hira',


	Latin = 'Latn',
	Tamil = 'Taml',
	Tibetan = 'Tibt',

}

Object.keys(UNICODE_SCRIPTS_NAME_ALIAS)
	.forEach(function (key)
	{
		let k2 = UNICODE_SCRIPTS_NAME_ALIAS[key];

		if (k2 && !UNICODE_SCRIPTS_NAME_ALIAS[k2])
		{
			// @ts-ignore
			UNICODE_SCRIPTS_NAME_ALIAS[k2] = key;
		}
	})
;

export const PatternTest: {
	[k in keyof typeof UNICODE_SCRIPTS_ALL]?: IPatternTestRow[];
} = {

	Greek: [
		['^\\p{Script=Greek}+$', 'u', 'μετά', true, 'test'],
	],

	Latin: [
		['^\\p{Script=Latin}+$', 'u', 'Grüße', true, 'test'],
		['^\\p{Script=Latin}+$', 'u', 'façon', true, 'test'],
		['^\\p{Script=Latin}+$', 'u', 'mañana', true, 'test'],
	],

	Katakana: [
		['^\\p{Script=Katakana}+$', 'u', 'カタカナ', true, 'test'],
	],

	Hiragana: [
		['^\\p{Script=Hiragana}+$', 'u', 'ひらがな', true, 'test'],
	],

	Han: [
		['^\\p{Script=Han}+$', 'u', 'カタカナ', false, 'test'],
		['^\\p{Script=Han}+$', 'u', '可以知道', true, 'test'],
	],

	Hangul: [
		['^\\p{Script=Hangul}+$', 'u', '\u1190', true, 'test'],
	],

	Common: [
		['^\\p{Script=Common}+$', 'u', '!', true, 'test'],
	],

	Arabic: [
		['^\\p{Script=Arabic}+$', 'u', 'لمو', true, 'test'],
	],

	Bengali: [
		['^\\p{Script=Bengali}+$', 'u', 'আমার', true, 'test'],
	],
	Cyrillic: [
		['^\\p{Script=Cyrillic}+$', 'u', 'летачко', true, 'test'],
	],
	Ethiopic: [
		['^\\p{Script=Ethiopic}+$', 'u', 'ማንዣበቢያ', true, 'test'],
	],
	Georgian: [
		['^\\p{Script=Georgian}+$', 'u', 'ხომალდი', true, 'test'],
	],

	Coptic: [
		['^\\p{Script=Coptic}+$', 'u', 'Ϫ', true, 'test'],
		['^\\p{Script=Coptic}+$', 'u', '\u03ea', true, 'test'],
	],

	Tamil: [
		['^\\p{Script=Tamil}+$', 'u', '்', true, 'test'],
		['^\\p{Script=Tamil}+$', 'u', '\u0bcd', true, 'test'],
	],

	Tibetan: [
		['^\\p{Script=Tibetan}+$', 'u', '༬', true, 'test'],
		['^\\p{Script=Tibetan}+$', 'u', '\u0f2c', true, 'test'],
	],

};

export const _testUnicodeScript = _createFnTestPattern(PatternTest);

export function testUnicodeScript<T>(name: string, RegExpClass?: ITypeCreateRegExp<T>, testPatterns: typeof PatternTest = PatternTest): boolean
{
	if (!PatternTest.hasOwnProperty(name) && UNICODE_SCRIPTS_NAME_ALIAS[name] && PatternTest.hasOwnProperty(UNICODE_SCRIPTS_NAME_ALIAS[name]))
	{
		name = UNICODE_SCRIPTS_NAME_ALIAS[name];
	}

	return _testUnicodeScript(name, RegExpClass, testPatterns);
}

// @ts-ignore
export function testUnicodeScriptAll<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest)
{
	return Object.keys(UNICODE_SCRIPTS_ALL).reduce(function (a, key)
	{
		a[key] = testUnicodeScript(key, RegExpClass, testPatterns);
		return a;
	}, {} as typeof UNICODE_SCRIPTS_ALL);
}

export function wrapToRegexName(name: string, negation?: boolean)
{
	let prefix = KEY_PREFIX;

	if (negation)
	{
		prefix = KEY_PREFIX_NEGATION;
	}

	return _wrapToRegexName(name, prefix, KEY_SUFFIX);
}

import * as self from './unicode-script';

export default self;
