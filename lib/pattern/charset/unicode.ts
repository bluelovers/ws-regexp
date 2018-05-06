/**
 * Created by user on 2018/5/6/006.
 */

import { ICreateRegExp, ITypeCreateRegExp } from '../../index';
import { IPatternTestFn, IPatternTestRow, PatternSupport, testPattern } from '../../pattern';
import { _createFnTestPattern } from '../../util/index';
import { _wrapToRegexName } from './index';

import CACHE_BLOCKS from '../cache/blocks';
import CACHE_CATEGORIES, { NAME_ALIAS } from '../cache/categories';
import CACHE_PROPERTIES from '../cache/properties';
import CACHE_SCRIPTS from '../cache/scripts';

//console.log(properties);

export const KEY_PREFIX = '\\p{';
export const KEY_PREFIX_NEGATION = '\\P{';
export const KEY_SUFFIX = '}';

/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
export const UNICODE = {
	White_Space: false,
	Letter: false,
};

export const UNICODE_ALL = {
	...CACHE_BLOCKS,
	...CACHE_CATEGORIES,
	...CACHE_PROPERTIES,
	//...CACHE_SCRIPTS,

	...UNICODE,
};

/**
 * @todo test more
 */
export const PatternTest: {
	[k in keyof typeof UNICODE_ALL]?: IPatternTestRow[];
} = {

	White_Space: [

		['^\\p{White_Space}+$', 'u', '\t \n\r', true, 'test'],

	],

	Letter: [

		['^\\p{Letter}+$', 'u', 'πüé', true, 'test'],
		['^\\p{L}+$', 'u', 'πüé', true, 'test'],

		['^\\P{L}+$', 'u', 'πüé', false, 'test'],
		['^\\P{L}+$', 'u', '\n', true, 'test'],

	],

	Surrogate: [

		['^\\p{Surrogate}+$', 'u', '\u{D83D}', true, 'test'],
		['^\\p{Surrogate}+$', 'u', '\u{DE00}', true, 'test'],

	],

	Any: [

		['^\\p{Any}+$', 'u', '1', true, 'test'],

	],

};

export const _testUnicode = _createFnTestPattern(PatternTest);

export function testUnicode<T>(name: string, RegExpClass?: ITypeCreateRegExp<T>, testPatterns: typeof PatternTest = PatternTest): boolean
{
	if (!PatternTest.hasOwnProperty(name) && NAME_ALIAS[name] && PatternTest.hasOwnProperty(NAME_ALIAS[name]))
	{
		name = NAME_ALIAS[name];
	}

	return _testUnicode(name, RegExpClass, testPatterns);
}

// @ts-ignore
export function testUnicodeAll<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest)
{
	return Object.keys(UNICODE_ALL).reduce(function (a, key)
	{
		a[key] = testUnicode(key);
		return a;
	}, {} as typeof UNICODE_ALL);
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

import * as self from './unicode';
export default self;
