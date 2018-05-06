/**
 * Created by user on 2018/5/6/006.
 */

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
	...UNICODE_SCRIPTS,
};

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

};

export const testUnicodeScript = _createFnTestPattern(PatternTest);

// @ts-ignore
export function testUnicodeScriptAll<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest)
{
	return Object.keys(UNICODE_SCRIPTS_ALL).reduce(function (a, key)
	{
		a[key] = testUnicodeScript(key);
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
